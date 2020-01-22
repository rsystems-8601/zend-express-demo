import {Component, Inject} from "@angular/core";
import {DzMaintenanceFailReasonComponent} from "../dz-maintenance-fail-reason/dz-maintenance-fail-reason.component";

import * as _ from "lodash";
import {DzMaintenanceDeleteConfirmationComponent} from "../dz-maintenance-delete-confirmation/dz-maintenance-delete-confirmation";

import * as moment from "moment";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {TranslateService} from "@ngx-translate/core";
import { DzMaintenanceConfirmComponent } from "../dz-maintenance-confirm/dz-maintenance-confirm.component";
import { MaintenanceService } from '../maintenance.service';
import { DateUtils } from 'src/app/common/date-utils';
import { TicketAttachment, TicketComment } from 'src/app/models/ticket.model';
import { TicketCommentCreateRequest, TicketService } from '../../dz-tickets/ticket.service';
import { MaintenanceEvent, MaintenanceEventWithRecurrencePatterns, MaintenanceEventApproval } from 'src/app/models/maintenance-event.model';
import { AuthHolderService } from 'src/app/services/auth-holder.service';
import { UserService } from 'src/app/portal-dashboard/admin/user/user.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { Permission } from 'src/app/models/permission.model';
import { Role } from 'src/app/models/role.model';
import { ShortUserInfo } from 'src/app/models/user.model';
import { Organization } from 'src/app/models/organization.model';

@Component({
    selector: "dz-maintenance-content",
    templateUrl: "./dz-maintenance-content.component.html",
    styleUrls: ["./dz-maintenance-content.component.scss"]
})
export class DzMaintenanceContentComponent {
    ProgressStatus = MaintenanceService.ProgressStatus;
    timezone = DateUtils.getTimeZoneShort();

    attachments: TicketAttachment[] = [];
    comments: TicketComment[] = [];
    commentsByType: { [type: string]: (notes: TicketComment[]) => TicketComment[] } = {
        discussion: notes => _.filter(notes, note => note.discussion),
        internal: notes => _.filter(notes, note => note.internal),
        resolution: notes => _.filter(notes, note => note.resolution),
        all: notes => notes
    };
    selectedCommentType = "discussion";
    ticketCommentFormValues: TicketCommentCreateRequest = {
        text: "",
        discussion: true,
        internal: false,
        resolution: false
    };
    cronDescription: string;
    recurrenceDate: number;
    approvalDetails: ApprovalDetails;
    progressTicketIds: { organization: string, ticketId: number }[];
    showApprovalDetails = false;
    showProgressTicketIds = false;

    constructor(@Inject(MAT_DIALOG_DATA) public maintenanceEvent: MaintenanceEvent,
                public auth: AuthHolderService,
                private maintenanceService: MaintenanceService,
                public userService: UserService,
                public organizationService: OrganizationService,
                public ticketService: TicketService,
                private translateService: TranslateService,
                private dialogRef: MatDialogRef<DzMaintenanceContentComponent>,
                private dialog: MatDialog) {

        let jobWithRecurrencePatterns = MaintenanceEventWithRecurrencePatterns.from(maintenanceEvent);
        this.cronDescription = jobWithRecurrencePatterns.getCronDescription();
        this.recurrenceDate = jobWithRecurrencePatterns.getRecurrenceDate();
        this.approvalDetails = this.getApprovalDetails(maintenanceEvent);
        this.progressTicketIds = this.getProgressTicketIds(maintenanceEvent);
        this.reloadCommentsAndAttachments();
    }

    approve() {
        this.maintenanceService.approveMaintenance(this.maintenanceEvent.id)
            .spinner('spinner')
            .subscribe(() => this.dialogRef.close());
    }

    reject() {
        this.dialog.open(DzMaintenanceFailReasonComponent, {data: "rejectionReason", width: "650px"})
            .afterClosed()
            .subscribe(result => {
                if (result && result.failureReason) {
                    this.maintenanceService.rejectMaintenance(this.maintenanceEvent.id, {
                        status: this.ProgressStatus.FAILED,
                        instanceStartDate: DateUtils.formatDateUTC(moment(this.maintenanceEvent.startDateTime)),
                        failureReason: result.failureReason
                    })
                    .spinner('spinner')
                    .subscribe(() => this.dialogRef.close());
                }
            });
    }

    changeStatus(progressStatus: string, failureReason?: string) {
        let message = this.maintenanceService.preStatusChangeCheckForDiabledOrganizations(this.maintenanceEvent, progressStatus);
        if (message.length > 0) {

            this.dialog.open(DzMaintenanceConfirmComponent, {data: message, width: "650px"})
            .afterClosed()
            .subscribe(confirmed => {
                if (confirmed) {
                    this.finallyChangeStatus(progressStatus, failureReason);
                }
            });

        } else {
            this.finallyChangeStatus(progressStatus, failureReason);
        }
    }

    finallyChangeStatus(progressStatus: string, failureReason?: string) {
        this.maintenanceService.changeStatus(this.maintenanceEvent.id, {
            status: progressStatus,
            instanceStartDate: DateUtils.formatDateUTC(moment(this.maintenanceEvent.startDateTime)),
            failureReason: failureReason
        })
            .spinner('spinner')
            .subscribe(() => this.dialogRef.close());
    }

    comment(comment: TicketCommentCreateRequest) {
        this.maintenanceService.addComment(
            this.maintenanceEvent.id,
            DateUtils.formatDateUTC(moment(this.maintenanceEvent.startDateTime)),
            comment)
            .spinner('spinner')
            .subscribe(() => {
                this.reloadCommentsAndAttachments();
                this.clearCommentsForm();
            });
    }

    clearCommentsForm() {
        this.selectCommentType(this.selectedCommentType);
        this.ticketCommentFormValues.text = "";
    }

    selectCommentType(type: string, event?: any) {
        //TODO: Workaround for https://github.com/valor-software/ngx-bootstrap/issues/1129
        if (event && !event.heading) {
            return;
        }
        this.selectedCommentType = type;
        this.ticketCommentFormValues = {
            text: "",
            discussion: type === "discussion" || type === "all",
            internal: type === "internal",
            resolution: type === "resolution"
        }
    }

    isInTerminalState(event: MaintenanceEvent): boolean {
        return _.includes([this.ProgressStatus.FINISHED, this.ProgressStatus.FAILED], event.progressStatus);
    }


    getAttachment(attachment: TicketAttachment) {
        this.ticketService.downloadAttachment(attachment.id, attachment.fileName).spinner().subscribe();
    }

    approvedByUser(event: MaintenanceEvent): boolean {
        const userId = this.auth.getAuthentication().sub;
        return _.some(event.approvals, approval => approval.user.id == userId && approval.approved);
    }

    rejectedByUser(event: MaintenanceEvent): boolean {
        const userId = this.auth.getAuthentication().sub;
        return _.some(event.approvals, approval => approval.user.id == userId && !approval.approved);
    }

    showFailReasonModal() {
        this.dialog.open(DzMaintenanceFailReasonComponent, {data: "failureReason", width: "650px"})
            .afterClosed()
            .subscribe(result => {
                if (result && result.failureReason) {
                    this.changeStatus(this.ProgressStatus.FAILED, result.failureReason);
                }
            });
    }

    canApproveOrReject(event: MaintenanceEvent): boolean {
        const ableToApprove = this.auth.hasPermission(Permission.EDIT_MAINTENANCE_EVENTS)
            && _.includes([Role.PORTAL_ADMIN, Role.PARTNER_ADMIN, Role.ORGANIZATION_ADMIN], this.auth.getRole());

        if (!ableToApprove || event.approvalStatus === MaintenanceService.ApprovalStatus.APPROVED || this.isInTerminalState(event)) {
            return false;
        }
        return _(event.organizations)
            .map(org => org.id)
            .includes(this.auth.getAuthentication().organizationId)
    }

    confirmDeletion(event: MaintenanceEvent) {
        this.dialog.open(DzMaintenanceDeleteConfirmationComponent, {data: this.maintenanceEvent, width: "650px"})
            .afterClosed()
            .subscribe(confirmed => {
                if (confirmed) {
                    this.maintenanceService.deleteMaintenanceEvent(event.id, DateUtils.formatDateUTC(moment(event.startDateTime)))
                        .spinner('spinner')
                        .subscribe(() => {
                            this.dialogRef.close();
                            this.maintenanceService.update();
                        });
                }
            });
    }

    getApprovalDetails(maintenance: MaintenanceEvent): ApprovalDetails {
        const approvalsByCid = _.groupBy(maintenance.approvals, approval => approval.user.customerId);

        const {pendingOrgs, rejectedOrgs, approvedOrgs} = _.groupBy(maintenance.organizations, org => {
            const approvals = approvalsByCid[org.customerId];
            return !approvals
                ? "pendingOrgs"
                : _.some(approvals, approval => !approval.approved)
                    ? "rejectedOrgs"
                    : "approvedOrgs";
        });

        const getUserListByCid = (approvals: MaintenanceEventApproval[], predicate: (approval: MaintenanceEventApproval) => boolean) =>
            _(approvals)
                .filter(predicate)
                .map(approval => approval.user)
                .groupBy(user => user.customerId)
                .mapValues((users: ShortUserInfo[]) => users.map(user => this.userService.userToString(user)).join(", "))
                .value();

        let pendingUsers, rejectUsers, approvedUsers;
        if (maintenance.type === MaintenanceService.MaintenanceType.CHANGE_FREEZE) {
            const approvalsByUserid = _.groupBy(maintenance.approvals, approval => approval.user.id);
            const {pendingUserId, rejectedUserId, approvedUserId} = _.groupBy(maintenance.approvers, app => {
                const approvals = approvalsByUserid[app.id];
                return !approvals
                ? "pendingUserId"
                : _.some(approvals, approval => !approval.approved)
                    ? "rejectedUserId"
                    : "approvedUserId";
            });
            pendingUsers = pendingUserId && pendingUserId.map(user => this.userService.userToString(user)).join(", ");
            rejectUsers = rejectedUserId && rejectedUserId.map(user => this.userService.userToString(user)).join(", ");
            approvedUsers = approvedUserId && approvedUserId.map(user => this.userService.userToString(user)).join(", ");
        }

        return {
            pendingOrganizationsList: pendingOrgs && pendingOrgs.map(org => this.organizationService.organizationToString(org)).join(", "),
            approvedOrganizationsList: approvedOrgs && approvedOrgs.map(org => this.organizationService.organizationToString(org)).join(", "),
            rejectedOrganizations: rejectedOrgs,
            approvedUsersListByCid: getUserListByCid(maintenance.approvals, approval => approval.approved),
            rejectedUsersListByCid: getUserListByCid(maintenance.approvals, approval => !approval.approved),

            approvedPortalAdminList: approvedUsers,
            rejectedPortalAdminList: rejectUsers,
            pendingPortalAdminList: pendingUsers
        };
    };

    assignUser(job: MaintenanceEvent, user: ShortUserInfo) {
        this.maintenanceService.assignUser(job.id, {
            userId: user.id,
            instanceStartDate: DateUtils.formatDateUTC(job.startDateTime)
        })
            .spinner()
            .subscribe();
    }

    assignedUserToString(job): string {
        return job.assignedUser
            ? this.userService.userToString(job.assignedUser)
            : this.translateService.instant("unassigned");
    }

    private reloadCommentsAndAttachments() {
        let startDate = DateUtils.formatDateUTC(moment(this.maintenanceEvent.startDateTime));
        this.maintenanceService.getComments(this.maintenanceEvent.id, startDate)
            .spinner('spinner')
            .subscribe(comments => this.comments = comments);
        this.maintenanceService.getAttachments(this.maintenanceEvent.id, startDate)
            .subscribe(attachments => this.attachments = attachments);
    }

    private getProgressTicketIds(maintenanceEvent: MaintenanceEvent) {
        let orgsById = _.keyBy(maintenanceEvent.organizations, org => org.id);
        return _.map(maintenanceEvent.progressTicketIdsByOrganizationId, (ticketId, orgId) => {
            return {
                organization: this.organizationService.organizationToString(orgsById[orgId]),
                ticketId: ticketId
            }
        });
    }
}

class ApprovalDetails {
    approvedUsersListByCid: { [cid: string]: string };
    rejectedUsersListByCid: { [cid: string]: string };
    approvedOrganizationsList: string;
    pendingOrganizationsList: string;
    rejectedOrganizations: Organization[];
    
    approvedPortalAdminList?: string;
    rejectedPortalAdminList?: string;
    pendingPortalAdminList?: string;
}