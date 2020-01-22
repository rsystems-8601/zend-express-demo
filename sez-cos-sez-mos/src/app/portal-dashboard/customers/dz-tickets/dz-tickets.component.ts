import {Component, ViewChild} from "@angular/core";
import * as _ from "lodash";
import {DzHelpDeskContactVerifier} from "./dz-helpdesk-contact-verifyer/dz-helpdesk-contact-verifyer.component";
import { Subscription, Observable,of,pipe} from "rxjs";
import { map,tap,filter,share,flatMap} from 'rxjs/operators';
import {MatDialog} from "@angular/material";
import {DzTicketChangesConfirmationComponent} from "./dz-ticket-cancel-changes/dz-ticket-changes-confirmation";
import {LocalStorage} from "ngx-webstorage";
import {TranslateService} from "@ngx-translate/core";
import { max } from "moment";
import { FilteringService, Operator } from 'src/app/services/filtering.service';
import { Permission } from 'src/app/models/permission.model';
import { Board, TicketCommentCreateRequest, TicketCreateRequest, TicketService, HelpDeskContact } from './ticket.service';
import { MemberReference, TicketComment, Ticket, TicketAttachment } from 'src/app/models/ticket.model';
import { User, ShortUserInfo } from 'src/app/models/user.model';
import { ShortOrganizationInfo, OrganizationType, Organization } from 'src/app/models/organization.model';
import { Sort, SortDirection } from 'src/app/models/sort.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from '../../admin/user/user.service';
import { FormService } from 'src/app/services/form.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';
import { ActivatedRoute } from '@angular/router';
import { PageRequest } from 'src/app/models/page-request.model';
import { Spinner } from 'src/app/common/spinner';
import { DzMaintenanceConfirmComponent } from '../dz-maintenance-viewer/dz-maintenance-confirm/dz-maintenance-confirm.component';
import { customSpinner } from 'src/app/infra/rx-spinner-operator';


@Component({
    selector: "dz-tickets",
    templateUrl: "./dz-tickets.component.html",
    styleUrls: ["./dz-tickets.component.scss"],
    providers: [FilteringService]
})
export class DzTicketsComponent {
    readonly maxTablength = 10;
    Permission = Permission;
    severityLevels = {
        LOW: "LOW",
        MEDIUM: "MEDIUM",
        HIGH: "HIGH"
    };
    impactLevels = {
        LOW: "Low",
        MEDIUM: "Medium",
        HIGH: "High"
    };
    severityLevelArray;
    selectedBoard: Board;
    allStatuses = _(this.getBoards()).flatMap(board => board['statuses']).uniq().value();
    allTypes = _(this.getBoards()).flatMap(board => board['types']).uniq().value();
    filterOptionsByField = {
        "id": new FilterOptions("id", "id", Operator.EQUAL, true),
        "summary": new FilterOptions("summary", "summary", Operator.CONTAINS, true),
        "status": new FilterOptions("status", "status", Operator.IN, true, null, value => (value as string[]).join(",")),
        "contactName": new FilterOptions("contact", "contactName", Operator.CONTAINS, true),
        "severity": new FilterOptions("urgency", "severity", Operator.EQUAL),
        "impact": new FilterOptions("impact", "impact", Operator.EQUAL),
        "priority/id": new FilterOptions("priority", "priority/id", Operator.EQUAL),
        "type/name": new FilterOptions("type", "type/name", Operator.EQUAL),
        "createdDateRange": new FilterOptions("createdDateRange", "createdDateRange", Operator.EQUAL, false, new DateRange()),
        "updatedDateRange": new FilterOptions("updatedDateRange", "updatedDateRange", Operator.EQUAL, false, new DateRange()),
        "resources": new FilterOptions("assignedTo", "resources", Operator.CONTAINS, false, null, value => (value as MemberReference).identifier)
    };
    commentsByType: { [type: string]: (notes: TicketComment[]) => TicketComment[] } = {
        discussion: notes => _.filter(notes, note => note.discussion),
        internal: notes => _.filter(notes, note => note.internal),
        resolution: notes => _.filter(notes, note => note.resolution),
        all: notes => notes
    };
    selectedCommentType = "discussion";

    showUserSelectForContactOnTicketEdit = true;
    showUserSelectForContactOnTicketNew = true;

    ticketNoteFormValues: TicketCommentCreateRequest = {
        text: "",
        discussion: true,
        internal: false,
        resolution: false
    };
    tickets: Array<Ticket>;
    selectedTicket: Ticket;
    selectedTicketId: number;
    unchangedTicket: Ticket;
    isShowNewTicket = false;
    newTicket: TicketCreateRequest;
    ticketChanged = false;
    newTicketBoard: Board;
    newTicketContact: User;
    newTicketOrganization: ShortOrganizationInfo;
    files: Array<File> = [];
    filters: Array<Filter>;
    filterTrackBy = (filter: Filter) => filter.field;
    sort = new Sort("lastUpdated", SortDirection.DESC);
    sortableFields = ["lastUpdated", "dateEntered"];
    authUser$: Observable<User>;
    authUser: User;
    authMemberReference$: Observable<MemberReference>;
    viewPortItems: Ticket[];
    compareUsersFn = (user1: User | ShortUserInfo | string, user2: User | ShortUserInfo | string) => {
        return this.getEmailFromUser(user1) === this.getEmailFromUser(user2);
    };

    scopeOrganizationType: OrganizationType;
    ORG_TYPE: typeof OrganizationType = OrganizationType;

    @LocalStorage("ticketing-tabs", [])
    tabs: Array<string>;
    @LocalStorage("ticketing-selectedtab") selectTabIndex: number;

    private contactChangeSubscription: Subscription;
    private openStatusesFilter = new Filter("status", Operator.IN, false, this.ticketService.OPEN_STATUSES);

    searchOrganizations = (name: string) => this.organizationService.organizationsSearchFunction(name)
        .pipe(map(orgs => orgs.filter(org => OrganizationType[org.type] !== OrganizationType.PORTAL_ADMIN)));

    @ViewChild('saveTicketContactVerifier', {static: false}) public saveTicketContactVerifier: DzHelpDeskContactVerifier;
    @ViewChild('changeContactVerifier', {static: false}) public changeContactVerifier: DzHelpDeskContactVerifier;

    constructor(public ticketService: TicketService,
                public organizationService: OrganizationService,
                public userService: UserService,
                public formService: FormService,
                public auth: AuthHolderService,
                private filteringService: FilteringService,
                private dialog: MatDialog,
                route: ActivatedRoute,
                private translatorService: TranslateService) {
        this.tabs = _.remove(this.tabs, function(tab) {
            return tab != "newTab";
        });
        this.reduceTicketTabSize();

        this.selectTabIndex = this.selectTabIndex || 0;

        if (this.tabs && this.tabs.length) {
            this.selectTabIndex = this.tabs.length - 1 < this.selectTabIndex ? this.tabs.length - 1 : this.selectTabIndex;
            this.selectedTicketId = +this.tabs[this.selectTabIndex]
        }

        this.severityLevelArray = ticketService.severityLevelsArray;
        this.filteringService.getAllFiltersObservable().subscribe(() => this.reloadTickets());

        if (auth.hasPermission(Permission.VIEW_ORGANIZATION_MANAGEMENT)) {
            this.filterOptionsByField["organizationId"] = new FilterOptions("organization", "organizationId", Operator.EQUAL, false, null, value =>
                (value as Organization[])
                    .map(org => org.id)
                    .join(","));

            if (!auth.isPortalAdmin()) {
                organizationService.getOrganization(auth.getAuthentication().organizationId)
                    .subscribe(org => this.filterOptionsByField["organizationId"].defaultValue = [org]);
            }
        }
        if (auth.isPortalAdmin()) {
            this.filterOptionsByField["board/id"] = new FilterOptions("board", "board/id", Operator.EQUAL, false, null, (board: Board) => board.id)
        }
        this.authUser$ = this.userService.getUserByEmail(this.auth.getAuthentication().email).pipe(tap(),share());
        this.authUser$.subscribe(user => this.authUser = user);
        this.authMemberReference$ = this.ticketService.memberReferenceSearchFunction(this.auth.getAuthentication().email)
            .pipe(tap(),share(),
                  map(members => members[0]));

        if (route.snapshot.queryParams.new) {
            this.createNewTicket();
        }
        if (route.snapshot.queryParams.id) {
            const idFilter = Filter.init(this.filterOptionsByField["id"], route.snapshot.queryParams.id);
            this.filters = [idFilter];
            this.applyFilter(idFilter);
        } else {
            this.selectDefaultFilters();
        }

        this.scopeOrganizationType = !this.auth.getAuthentication().scope ? this.auth.getOrganizationType() : this.ORG_TYPE[this.auth.getAuthentication().scope.organizationType];
        if (this.scopeOrganizationType == this.ORG_TYPE.CUSTOMER) {
            this.filterOptionsByField["supportUpdatedFlag"] = new FilterOptions("supportHasUpdated", "supportUpdatedFlag", Operator.EQUAL, false, false);
        } else {
            this.filterOptionsByField["customerUpdatedFlag"] = new FilterOptions("customerHasUpdated", "customerUpdatedFlag", Operator.EQUAL, false, true);
        }
    }

    reduceTicketTabSize() {
        if (this.tabs.length > this.maxTablength) {
            let spliceTabs = (this.tabs.length - this.maxTablength);
            this.tabs.splice(0, spliceTabs);
        }
    }

    selectTicket(ticket: Ticket) {
        this.tabs[this.selectTabIndex] = ticket.id.toString();
        this.confirmTicketChanges().subscribe(() => {
            this.isShowNewTicket = false;
            this.selectedTicket = ticket;
            this.openTicketDetails(ticket);
        })
    }

    selectTab(tabIndex: number) {
        if (this.tabs.length == tabIndex) {
            this.createTab();
        } else {
            this.selectedTicketId = +this.tabs[tabIndex];
            if (this.tickets) {
                const ticketFromTab = this.tickets.filter(ticket => ticket.id == this.selectedTicketId)[0];
                ticketFromTab ? this.selectTicket(ticketFromTab) : this.selectedTicket = null;
            }
        }
    }

    createTab() {
        if (this.tabs.length === this.maxTablength) {
            // const message = "You already have " + this.maxTablength + " tickets in current view. Continuing will remove the first ticket with id: " + this.tabs[0];
            const message = "Opening a new tab will remove the first ticket with id: " + this.tabs[0] + " from tab";
            this.dialog.open(DzMaintenanceConfirmComponent, {data: message, width: "650px"})
            .afterClosed()
            .subscribe(confirmed => {
                if (confirmed) {
                    this.createNewTab()
                }
            });

        } else {
            this.createNewTab();
        }

    }

    private createNewTab() {
        this.tabs.push("newTab");
        this.tabs = this.tabs;
        this.selectedTicket = null;
        this.reduceTicketTabSize();
        this.selectTab(this.tabs.length - 1);
        this.selectTabIndex = this.tabs.length - 1;
    }

    closeTab(tabIndex: number) {
        this.tabs.splice(tabIndex, 1);
        this.tabs = this.tabs;
        this.selectTabIndex = tabIndex - 1;
    }

    selectCcEmails(users: Array<User>) {
        this.newTicket.ccEmails = _.map(users, user => user.email);
    }

    clearAllFilters() {
        this.filters = [Filter.empty()];
        this.filteringService.removeAllFilters();
    }

      reloadTickets() {
        this.confirmTicketChanges()
            .pipe(
                flatMap(() =>this.ticketService.getTickets(PageRequest.all(this.sort), this.filteringService.filters))
            )
            .subscribe(page => {
                this.tickets = page.content;
                this.tickets = this.tickets.map(ticket => ({
                    ...ticket,
                    customerUpdateBanner: this.customerHasUpdated(ticket.customerUpdatedFlag, ticket.company.identifier),
                    supportUpdateBanner: this.supportHasUpdated(ticket.customerUpdatedFlag, ticket.company.identifier)
                }));

                if (this.isShowNewTicket || !this.tickets.length) {
                    return;
                }

                let tickets = this.tickets;
                let selectedIndex = this.selectedTicketId && _.findIndex(tickets, ticket => ticket.id === this.selectedTicketId);

                if (selectedIndex >= 0) {
                    let ticket = tickets.splice(selectedIndex, 1)[0];
                    tickets.unshift(ticket);
                    this.selectTicket(ticket);
                } else {
                    this.selectTicket(tickets[0]);
                }
            });
    }

    initFilter(filter: Filter, filterOptions: FilterOptions) {
        if (filter.field && filter.field != filterOptions.field) {
            this.filteringService.removeFilter(filter.field);
            filter.clear();
            filter.update(this.filterOptionsByField[filterOptions.field]);
            this.reloadTickets();
        } else {
            filter.update(filterOptions);
        }
        this.showEmptyFilterIfNeeded();
    }

    selectDefaultFilters() {
        this.selectedBoard = null;
        this.setFilters(this.openStatusesFilter);
    }

    selectFilterTicketsAssignedToMe() {
        this.authMemberReference$.subscribe(memberRef => {
            const memberFilter = new Filter("resources", Operator.CONTAINS, false, memberRef);
            this.setFilters(this.openStatusesFilter, memberFilter);
        });
    }

    selectFilterTicketsISubmitted() {
        this.authUser$.subscribe(user => {
            const contactFilter = new Filter("contactName", Operator.CONTAINS, false, this.userService.userToString(user));
            this.setFilters(this.openStatusesFilter, contactFilter);
        })
    }

    selectFilterCustomerHasUpdated() {
        const customerHasUpdatedFilter = new Filter("customerUpdatedFlag", Operator.EQUAL, false, "true");
        this.setFilters(this.openStatusesFilter, customerHasUpdatedFilter);
    }

    selectFilterSupportHasUpdated() {
        const supportHasUpdatedFilter = new Filter("supportUpdatedFlag", Operator.EQUAL, false, "false");
        this.setFilters(this.openStatusesFilter, supportHasUpdatedFilter);
    }

    getBoards() {
        return this.auth.isPortalAdmin()
            ? this.ticketService.BOARDS
            : [this.ticketService.BOARDS["Customer Experience"], this.ticketService.BOARDS["Customer Portal"]];
    }

    selectBoard(board: Board) {
        this.selectedBoard = board;
        let boardOpenStatuses = this.ticketService.getOpenStatuses(board.statuses);
        this.setFilters(
            new Filter("status", Operator.IN, false, boardOpenStatuses),
            new Filter("board/id", Operator.EQUAL, false, board)
        );
    }

    clearFilter(filterIndex: number) {
        const filter = this.filters.splice(filterIndex, 1)[0];
        switch (filter.field) {
            case this.filterOptionsByField.createdDateRange.field:
                this.filteringService.removeFilter("dateEnteredFrom", "dateEnteredTo");
                break;
            case this.filterOptionsByField.updatedDateRange.field:
                this.filteringService.removeFilter("lastUpdatedFrom", "lastUpdatedTo");
                break;
            default:
                this.filteringService.removeFilter(filter.field);
        }
    }

    applyFilter(filter: Filter) {
        this.showEmptyFilterIfNeeded();
        this.selectedTicket = null;

        const filterOptions = filter.field == "supportUpdatedFlag" ? this.filterOptionsByField["customerUpdatedFlag"] : this.filterOptionsByField[filter.field];
        const value = filterOptions
            ? filterOptions.valueTransformer(filter.value)
            : filter.value;
        this.filteringService.and(filter.operator, filter.field == "supportUpdatedFlag" ? "customerUpdatedFlag"  : filter.field, value, filter.withDebounce)
    }

    setFilters(...filters: Filter[]) {
        this.filters = filters;

        this.filteringService.filters = this.filters
            .reduce((builder, filter) => {
                const value = this.filterOptionsByField[filter.field].valueTransformer(filter.value);
                return builder.and(filter.operator, filter.field == "supportUpdatedFlag" ? "customerUpdatedFlag" : filter.field, value);
            }, FilteringService.builder())
            .build();

        this.selectedTicket = null;
        this.showEmptyFilterIfNeeded();
        this.reloadTickets();
    }

    showEmptyFilterIfNeeded() {
        if (_.every(this.filters, filter => filter.isComplete())) {
            this.filters.push(Filter.empty());
        }
    }

    filterByCreationDateFrom(date: Date) {
        date
            ? this.applyFilter(new Filter("dateEnteredFrom", Operator.GREATER_OR_EQUAL, false, date.getTime()))
            : this.filteringService.removeFilter("dateEnteredFrom");
    }

    filterByCreationDateTo(date: Date) {
        date
            ? this.applyFilter(new Filter("dateEnteredTo", Operator.LESS_OR_EQUAL, false, date.getTime()))
            : this.filteringService.removeFilter("dateEnteredTo");
    }

    filterByUpdateDateFrom(date: Date) {
        date
            ? this.applyFilter(new Filter("lastUpdatedFrom", Operator.GREATER_OR_EQUAL, false, date.getTime()))
            : this.filteringService.removeFilter("lastUpdatedFrom");
    }

    filterByUpdateDateTo(date: Date) {
        date
            ? this.applyFilter(new Filter("lastUpdatedTo", Operator.LESS_OR_EQUAL, false, date.getTime()))
            : this.filteringService.removeFilter("lastUpdatedTo");
    }

    openTicketDetails(ticket: Ticket) {
        if (!this.selectedTicket || !this.selectedTicket.details) {
            this.ticketService.getTicketDetails(ticket.id)
                // .spinner()
                .subscribe(details => {
                    ticket.details = details;
                    this.selectedTicket = ticket;
                    this.unchangedTicket = _.cloneDeep(ticket);
                    this.showUserSelectForContactOnTicketEdit = !!this.selectedTicket.details.portalUser;
                    this.selectedTicket.priority = ticket.priority;
                });
        }
    }

    createNewTicket() {
        this.createTab();
        this.authUser$.subscribe(user => {
            this.newTicketBoard = _.values(this.ticketService.BOARDS)[0];
            this.newTicketContact = user;
            if (this.auth.hasPermission(Permission.VIEW_ORGANIZATION_MANAGEMENT) && !this.auth.isScopeEnabled()) {
                this.setNewTicketOrganization(user.organization);
            }
            this.newTicket = {
                type: this.newTicketBoard.types[0],
                severity: this.severityLevels.MEDIUM,
                impact: this.impactLevels.MEDIUM
            };
            this.files = [];
            this.isShowNewTicket = true;
        })
    }

    setNewTicketOrganization(organization: Organization) {
        if (OrganizationType[organization.type] === OrganizationType.PORTAL_ADMIN) {
            this.organizationService.getDizzion().subscribe(dizzion => this.newTicketOrganization = ShortOrganizationInfo.from(dizzion))
        } else {
            this.newTicketOrganization = ShortOrganizationInfo.from(organization);
        }
    }

    verifyContactOnSaveTicket() {
        let newTicketOrgName = this.newTicketOrganization
            ? this.newTicketOrganization.name
            : this.auth.getAuthentication().organizationName;
        this.saveTicketContactVerifier.verifyContactExistsFor(this.newTicketContact.id, this.newTicketContact.email, newTicketOrgName);
    }

    verifyContactOnContactChange(ticket: Ticket, user: User) {
        this.contactChangeSubscription && this.contactChangeSubscription.unsubscribe();
        this.contactChangeSubscription = this.changeContactVerifier.persist.subscribe(() => {
            this.selectedTicket.details.portalUser = ShortUserInfo.from(user);
            this.ticketChanged = true;
        });
        const orgName = OrganizationType[user.organization.type] === OrganizationType.PORTAL_ADMIN
            ? OrganizationService.DizzionName
            : user.organization.name;
        this.changeContactVerifier.verifyContactExistsFor(user.id, user.email, orgName);
    }
    // TODO making save ticket parameter as option
    saveTicket(helpdeskContact?: HelpDeskContact) {
        Spinner.show();
        this.newTicket.boardId = this.newTicketBoard.id;
        this.newTicket.contactEmail =helpdeskContact ? helpdeskContact.email : this.newTicketContact.email;
        let impactKey = this.newTicket.impact;
        let urgencyKey = this.newTicket.severity;
        let severity = _.findLast(this.severityLevelArray, function(severity) {
            return severity.impact == impactKey && severity.urgency == urgencyKey
        });
        this.newTicket.priority = _.findLast(this.ticketService.priorityList, function(priority) {
            return priority.name == severity.text;
        });

        this.newTicket.organizationId = this.newTicketOrganization && this.newTicketOrganization.id;
        this.ticketService.saveTicket(this.newTicket)
            .subscribe(
                ticket => {
                    this.files.forEach(file => this.ticketService.uploadAttachment(ticket.id, file).subscribe());
                    this.files = [];
                    this.selectedTicketId = ticket.id;
                    this.reloadTickets();
                },
                () => Spinner.hide());
        this.isShowNewTicket = false;
    }

    postNote(ticket: Ticket, commentCreateRequest: TicketCommentCreateRequest) {
        Spinner.show();
        let customerUpdateFlag = (this.authUser.organization.id == this.selectedTicket.details.portalOrganization.id) && !this.auth.isPortalAdmin()
        this.ticketService.saveTicketComment(ticket.id, customerUpdateFlag, commentCreateRequest)
            .subscribe(resp => this.reloadTickets());
    }

    isTicketEditable(ticket: Ticket) {
        return this.auth.hasPermission(Permission.EDIT_TICKETS) &&
            _.includes(this.ticketService.OPEN_STATUSES, ticket.status.name);
    }

    submitTicketChanges(): Observable<any> {
        this.ticketChanged = false;
        let selectedPriority = this.selectedTicket.priority;
        let ticketPriority =  _.findLast(this.ticketService.priorityList, function(priority) {
            return priority.name == selectedPriority.name;
        });

        Spinner.show();
        try {
            return this.ticketService.updateTicket(this.selectedTicket.id, {
                boardId: this.selectedTicket.board.id,
                contactEmail: this.showUserSelectForContactOnTicketEdit
                    ? this.selectedTicket.details.portalUser.email
                    : this.selectedTicket.contactEmailAddress,
                organizationId: this.selectedTicket.details.portalOrganization.id,
                type: this.selectedTicket.type.name,
                ccEmails: this.selectedTicket.details.ccEmails,
                severity: this.selectedTicket.severity,
                impact: this.selectedTicket.impact,
                statusName: this.auth.isPortalAdmin() ? this.selectedTicket.status.name : null,
                priority: ticketPriority,
                customerUpdatedFlag: this.authUser.organization.id == this.selectedTicket.details.portalOrganization.id,
                assignedMemberIdentifiers: this.auth.isPortalAdmin() ? this.selectedTicket.details.assignedMembers.map(member => member.identifier) : null
            })
            .pipe(flatMap(() => of(true), () => Spinner.hide()));
        } catch {
            Spinner.hide();
        }
    }

    cancelTicketChanges() {
        this.selectedTicket = _.cloneDeep(this.unchangedTicket);
        this.ticketChanged = false;
    }

    submitTicketChangesAndReload() {
        this.submitTicketChanges().subscribe(() => this.reloadTickets(),
        (error) => {
            this.cancelTicketChanges();
            Spinner.hide();
        });
    }

    confirmTicketChanges(): Observable<Boolean> {
        if (this.ticketChanged) {
            return this.dialog.open(DzTicketChangesConfirmationComponent)
                .afterClosed()
                .pipe(
                    flatMap(confirm => {
                    if (confirm) {
                        return this.submitTicketChanges();
                    } else {
                        this.cancelTicketChanges();
                        return of(true);
                    }
                }));
        } else {
            return of(true);
        }
    }

    changeBoard(ticket: Ticket, boardName: string) {
        let board = this.ticketService.BOARDS[boardName];
        this.selectedTicket.board = {
            id: board.id,
            name: boardName
        };
        this.selectedTicket.type.name = board.types[0];
        this.selectedTicket.status.name = board.statuses[0];
        this.ticketChanged = true;
    }

    changeContact(ticket: Ticket, userOrEmail: User | string) {
        if (typeof userOrEmail == "string") {
            this.selectedTicket.contactEmailAddress = userOrEmail;
            this.selectedTicket.contactName = "";
            this.ticketChanged = true;
        } else {
            this.verifyContactOnContactChange(ticket, userOrEmail);
        }
    }

    changeStatus(ticket: Ticket, status: string) {
        this.selectedTicket.status.name = status;
        this.ticketChanged = true;
    }

    changeSeverity(ticket: Ticket, severity: string) {
        this.selectedTicket.severity = severity;
        this.setPriorityForSelectedTicket(this.selectedTicket.impact, this.selectedTicket.severity);
        this.ticketChanged = true;
    }

    changeImpact(ticket: Ticket, impact: string) {
        this.selectedTicket.impact = impact;
        this.setPriorityForSelectedTicket(this.selectedTicket.impact, this.selectedTicket.severity);
        this.ticketChanged = true;
    }

    changeType(ticket: Ticket, type: string) {
        this.selectedTicket.type.name = type;
        this.ticketChanged = true;
    }

    changeCcEmail(ticket: Ticket, ccEmails: string) {
        this.selectedTicket.details.ccEmails = ccEmails.split(",").map(email => email.trim());
        this.ticketChanged = true;
    }

    assignMembers(ticket: Ticket, members: MemberReference[]) {
        this.selectedTicket.details.assignedMembers = members;
        this.ticketChanged = true;
    }

    cancelFile(index: number) {
        this.files.splice(index, 1);
    }

    attachFile(inputElement, ticketId: number) {
        this.ticketService.uploadAttachment(ticketId, inputElement.files.item(0)).subscribe(() => this.reloadTickets());
        inputElement.value = "";
    }

    selectAttachmentFiles(fileList: FileList) {
        for (let i = 0; i < fileList.length; i++) {
            this.files.push(fileList.item(i));
        }
    }

    getAttachment(attachment: TicketAttachment) {
        this.ticketService.downloadAttachment(attachment.id, attachment.fileName)
         .pipe(customSpinner())
        .subscribe();
    }

    getContactName(): string {
        return this.showUserSelectForContactOnTicketEdit
            ? this.userService.userToString(this.selectedTicket.details.portalUser)
            : (this.selectedTicket.contactName || this.selectedTicket.contactEmailAddress)
    }

    getContactEmail(): string {
        return this.selectedTicket.details.portalUser
            ? this.selectedTicket.details.portalUser.email
            : this.selectedTicket.contactEmailAddress;
    }

    selectCommentType(type: string, event?: any) {
        // TODO: Workaround for https://github.com/valor-software/ngx-bootstrap/issues/1129
        if (event && !event.heading) {
            return;
        }

        this.selectedCommentType = type;
        this.ticketNoteFormValues = {
            text: "",
            discussion: type === "discussion" || type === "all",
            internal: type === "internal",
            resolution: type === "resolution",
            status: this.selectedTicket.status.name
        }
    }

    getAssignedMemberNames(ticket: Ticket) {
        return ticket.details && ticket.details.assignedMembers.map(member => member && member.name).join(", ");
    }

    assignMeAsResource() {
        this.authMemberReference$.subscribe(memberRef => this.selectedTicket.details.assignedMembers = [memberRef]);
    }

    impactUrgencyTranslation(impactKey, urgencyKey) {
        return this.translatorService.instant(impactKey) + "/" + this.translatorService.instant(urgencyKey);
    }

    private getEmailFromUser(userOrEmail: User | ShortUserInfo | string) {
        return typeof userOrEmail === "string"
            ? userOrEmail
            : (userOrEmail && userOrEmail.email);
    }

    private setPriorityForSelectedTicket(impactKey, urgencyKey) {
        if (this.selectedTicket && impactKey && urgencyKey) {
             let severity = _.findLast(this.severityLevelArray, function(severity) {
                return severity.impact == impactKey && severity.urgency == urgencyKey
            });
            this.selectedTicket.priority = _.findLast(this.ticketService.priorityList, function(priority) {
                return priority.name == severity.text;
            });
        }

    }

    private customerHasUpdated(customerUpdateFlag: boolean, ticketCid: string) {
        if (!this.auth.getAuthentication().scope) {
            return (this.auth.getAuthentication().organizationCid != ticketCid && customerUpdateFlag == true);
        } else {
            return (this.auth.getAuthentication().scope.organizationCid != ticketCid && customerUpdateFlag == true);
        }
    }

    private supportHasUpdated(customerUpdateFlag: boolean, ticketCid: string) {
        if (!this.auth.getAuthentication().scope) {
            return (customerUpdateFlag == false && this.auth.getAuthentication().organizationCid == ticketCid);
        } else {
            return (customerUpdateFlag == false && this.auth.getAuthentication().scope.organizationCid == ticketCid);
        }
    }
}

class Filter {
    constructor(public field: string,
                public operator: Operator,
                public withDebounce = false,
                private _value?: any) {
    }

    static init(options: FilterOptions, value: any) {
        const filter = Filter.empty();
        filter.update(options);
        filter.value = value;
        return filter;
    }

    static empty(): Filter {
        return new Filter(null, null);
    }

    update(options: FilterOptions) {
        this.field = options.field;
        this.operator = options.operator;
        this.withDebounce = options.withDebounce;
        if (options.defaultValue) {
            this.value = options.defaultValue;
        }
    }

    clear() {
        this.field = null;
        this.operator = null;
        this.withDebounce = false;
        this.value = null;
    }

    operatorToString(): string {
        return Operator[this.operator];
    }

    isComplete(): boolean {
        return !!(this.field && this.operator && this.value);
    }

    get value(): any {
        return this._value;
    }

    set value(value: any) {
        this._value = value;
        if (Array.isArray(value)) {
            this.operator = value.length == 1
                ? Operator.EQUAL
                : Operator.IN;
        }
    }
}

class FilterOptions {
    constructor(public name: string,
                public field: string,
                public operator: Operator,
                public withDebounce = false,
                public defaultValue?: any,
                public valueTransformer = (value: any) => value) {
    }
}

class DateRange {
    start: Date;
    end: Date;
}
