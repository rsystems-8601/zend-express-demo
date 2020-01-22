
import {Injectable} from "@angular/core";

import {Observable} from "rxjs";
import { map } from 'rxjs/operators';

import {HttpResponse, HttpClient} from "@angular/common/http";


import {saveAs} from "file-saver";
import * as _ from "lodash";
import { RESTAuthClient } from 'src/app/infra/rest-auth-client';
import { CommonServiceDependencies } from 'src/app/infra/common-service-dependencies';
import { FilteringService, Operator } from 'src/app/services/filtering.service';
import { GET, QueryObject, Path, SkipErrorHandler, POST, Body, PUT, FileUpload, ResponseType } from 'src/app/infra/angular2-rest';
import { PageRequest } from 'src/app/models/page-request.model';
import { Page } from 'src/app/models/page.model';
import { TicketPriority, MemberReference, Member, Ticket, TicketDetails } from 'src/app/models/ticket.model';



export class TicketCreateRequest {
    summary?: string;
    detailDescription?: string;
    severity?: string;
    impact?: string;
    type?: string;
    ccEmails?: Array<string>;
    contactEmail?: string;
    organizationId?: number;
    boardId?: number;
    priority?: TicketPriority;
}

export class TicketUpdateRequest {
    statusName?: string;
    severity?: string;
    impact?: string;
    type?: string;
    ccEmails?: Array<string>;
    contactEmail?: string;
    organizationId?: number;
    assignedMemberIdentifiers?: string[];
    boardId?: number;
    priority?: TicketPriority;
    customerUpdatedFlag?: boolean;
}

export class TicketCommentCreateRequest {
    text: string;
    discussion: boolean;
    internal: boolean;
    resolution: boolean;
    attachment?: File;
    status?: string;
}

export class HelpDeskContact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
}

export type Board = {
    id: number;
    name: string,
    types: string[];
    statuses: string[];
}

@Injectable({
    providedIn:"root"
})
export class TicketService extends RESTAuthClient {
    readonly BOARDS: { [name: string]: Board } = {
        "Customer Experience": {
            id: 22,
            name: "Customer Experience",
            types: [
                "CUSTOMER_EXPERIENCE_BREAK_FIX",
                "CUSTOMER_EXPERIENCE_PLATFORM_FAILURE",
                "CUSTOMER_EXPERIENCE_MUST_CHANGE",
                "CUSTOMER_EXPERIENCE_PLATFORM_FAILOVER",
                "CUSTOMER_EXPERIENCE_SPAM",
                "CUSTOMER_EXPERIENCE_GENERAL_INQUIRY",
                "CUSTOMER_EXPERIENCE_DUPLICATE_ISSUE",
                "CUSTOMER_EXPERIENCE_PROV_NEW",
                "CUSTOMER_EXPERIENCE_PROV_UPGRADE",
                "CUSTOMER_EXPERIENCE_CUSTOMER_OUTAGE",
                "CUSTOMER_EXPERIENCE_PROV_DECOMMISSION",
                "CUSTOMER_EXPERIENCE_GOLDEN_IMAGE_CHANGE",
                "CUSTOMER_EXPERIENCE_SERVICE_DELIVERY",
                "CUSTOMER_EXPERIENCE_MWIN",
                "CUSTOMER_EXPERIENCE_DEN",
                "CUSTOMER_EXPERIENCE_IGEL"
            ],
            statuses: [
                "CUSTOMER_EXPERIENCE_NEW",
                "CUSTOMER_EXPERIENCE_ASSIGNED",
                "CUSTOMER_EXPERIENCE_SCHEDULED",
                "CUSTOMER_EXPERIENCE_IN_PROGRESS",
                "CUSTOMER_EXPERIENCE_ON_HOLD",
                "CUSTOMER_EXPERIENCE_WAITING_ON_CLIENT",
                "CUSTOMER_EXPERIENCE_WAITING_ON_VENDOR",
                "CUSTOMER_EXPERIENCE_WAITING_ON_CLIENT_REMINDER_1_OF_2",
                "CUSTOMER_EXPERIENCE_WAITING_ON_CLIENT_REMINDER_2_OF_2",
                "CUSTOMER_EXPERIENCE_FINAL_REMINDER_OF_TICKET_CLOSURE",
                "CUSTOMER_EXPERIENCE_COMPLETED",
                "CUSTOMER_EXPERIENCE_CLOSED",
                "CUSTOMER_EXPERIENCE_CLOSED_DUPLICATE_NO_NOTIFICATION",
                "CUSTOMER_EXPERIENCE_CANCELLED",
                "CUSTOMER_EXPERIENCE_UPDATED_BY_CUSTOMER"
            ]
        },
        "Customer Portal": {
            id: 45,
            name: "Customer Portal",
            types: [
                "CUSTOMER_PORTAL_BREAK_FIX",
                "CUSTOMER_PORTAL_PLATFORM_FAILURE",
                "CUSTOMER_PORTAL_MUST_CHANGE",
                "CUSTOMER_PORTAL_PLATFORM_FAILOVER",
                "CUSTOMER_PORTAL_SPAM",
                "CUSTOMER_PORTAL_GENERAL_INQUIRY",
                "CUSTOMER_PORTAL_DUPLICATE_ISSUE",
                "CUSTOMER_PORTAL_PROV_NEW",
                "CUSTOMER_PORTAL_PROV_UPGRADE",
                "CUSTOMER_PORTAL_CUSTOMER_OUTAGE",
                "CUSTOMER_PORTAL_PROV_DECOMMISSION",
                "CUSTOMER_PORTAL_GOLDEN_IMAGE_CHANGE",
                "CUSTOMER_PORTAL_SERVICE_DELIVERY",
                "CUSTOMER_PORTAL_MWIN"
            ],
            statuses: [
                "CUSTOMER_PORTAL_NEW",
                "CUSTOMER_PORTAL_ASSIGNED",
                "CUSTOMER_PORTAL_SCHEDULED",
                "CUSTOMER_PORTAL_IN_PROGRESS",
                "CUSTOMER_PORTAL_ON_HOLD",
                "CUSTOMER_PORTAL_WAITING_ON_CLIENT",
                "CUSTOMER_PORTAL_WAITING_ON_VENDOR",
                "CUSTOMER_PORTAL_WAITING_ON_CLIENT_REMINDER_1_OF_2",
                "CUSTOMER_PORTAL_WAITING_ON_CLIENT_REMINDER_2_OF_2",
                "CUSTOMER_PORTAL_FINAL_REMINDER_OF_TICKET_CLOSURE",
                "CUSTOMER_PORTAL_COMPLETED",
                "CUSTOMER_PORTAL_CLOSED",
                "CUSTOMER_PORTAL_CLOSED_DUPLICATE_NO_NOTIFICATION",
                "CUSTOMER_PORTAL_CANCELLED"
            ]
        },
        "Provisioning": {
            id: 36,
            name: "Provisioning",
            types: [
                "PROVISIONING_SECURITY_RELATED_INCIDENT_EVENT",
                "PROVISIONING_NON_SECURITY_INCIDENT_EVENT",
                "PROVISIONING_PROV_NEW",
                "PROVISIONING_PROV_UPGRADE",
                "PROVISIONING_PROV_DECOMMISSION",
                "PROVISIONING_IGEL",
            ],
            statuses: [
                "PROVISIONING_NEW",
                "PROVISIONING_IN_PROGRESS",
                "PROVISIONING_CLOSED",
                "PROVISIONING_ON_HOLD"]
        },
        "Change Management": {
            id: 38,
            name: "Change Management",
            types: [
                "CHANGE_MANAGEMENT_NORMAL_CHANGE_REQUEST",
                "CHANGE_MANAGEMENT_PRIORITY_CHANGE_REQUEST",
                "CHANGE_MANAGEMENT_PREAPPROVED_CHANGE_REQUEST",
                "CHANGE_MANAGEMENT_EMERGENCY_CHANGE_REQUEST"
            ],
            statuses: [
                "CHANGE_MANAGEMENT_NEW",
                "CHANGE_MANAGEMENT_APPROVED",
                "CHANGE_MANAGEMENT_DECLINED",
                "CHANGE_MANAGEMENT_CLOSED",
                "CHANGE_MANAGEMENT_PENDING"]
        },
        "Client Relations": {
            id: 39,
            name: "Client Relations",
            types: [
                "CLIENT_RELATIONS_REPORT_REQUEST",
                "CLIENT_RELATIONS_ORDER_FORM_NEEDED"
            ],
            statuses: [
                "CLIENT_RELATIONS_NEW",
                "CLIENT_RELATIONS_ASSIGNED",
                "CLIENT_RELATIONS_SCHEDULED",
                "CLIENT_RELATIONS_IN_PROGRESS",
                "CLIENT_RELATIONS_ON_HOLD",
                "CLIENT_RELATIONS_WAITING_ON_CLIENT",
                "CLIENT_RELATIONS_WAITING_ON_VENDOR",
                "CLIENT_RELATIONS_COMPLETED",
                "CLIENT_RELATIONS_CLOSED"
            ]
        },
        "Platform": {
            id: 43,
            name: "Platform",
            types: [
                "PLATFORM_GENERAL",
                "PLATFORM_NETWORK",
                "PLATFORM_HOST_HARDWARE",
                "PLATFORM_STORAGE",
                "PLATFORM_SOFTWARE",
                "PLATFORM_VENDOR_ISSUE"
            ],
            statuses: [
                "PLATFORM_NEW",
                "PLATFORM_ASSIGNED",
                "PLATFORM_IN_PROGRESS",
                "PLATFORM_CLOSED",
                "PLATFORM_SCHEDULED"
            ]
        }
    };
    readonly CLOSED_STATUSES = [
        "CUSTOMER_EXPERIENCE_COMPLETED",
        "CUSTOMER_EXPERIENCE_CLOSED",
        "CUSTOMER_EXPERIENCE_CANCELLED",
        "CUSTOMER_EXPERIENCE_CLOSED_DUPLICATE_NO_NOTIFICATION",
        "CUSTOMER_PORTAL_COMPLETED",
        "CUSTOMER_PORTAL_CLOSED",
        "CUSTOMER_PORTAL_CANCELLED",
        "CUSTOMER_PORTAL_CLOSED_DUPLICATE_NO_NOTIFICATION",
        "PROVISIONING_CLOSED",
        "CHANGE_MANAGEMENT_CLOSED",
        "CLIENT_RELATIONS_COMPLETED",
        "CLIENT_RELATIONS_CLOSED",
        "PLATFORM_CLOSED"
    ];
    readonly OPEN_STATUSES = this.getOpenStatuses(_(this.BOARDS).flatMap(board => board.statuses).uniq().value());

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    memberSearchFunction = (keyword: string): Observable<Member[]> => {
        const filters = FilteringService.builder()
            .or(Operator.CONTAINS, "firstName", keyword)
            .or(Operator.CONTAINS, "lastName", keyword)
            .or(Operator.CONTAINS, "officeEmail", keyword)
            .build();
        return this.getMembers(filters);
    };

    memberReferenceSearchFunction = (keyword: string): Observable<MemberReference[]> => {
        const filters = FilteringService.builder()
            .or(Operator.CONTAINS, "firstName", keyword)
            .or(Operator.CONTAINS, "lastName", keyword)
            .or(Operator.CONTAINS, "officeEmail", keyword)
            .build();
        return this.getMembers(filters).pipe(map(members => members.map(member => {
            return {
                identifier: member.identifier,
                name: this.memberToString(member)
            }
        })));
    };

    memberUserSearchFunction = (keyword: string) => this.memberSearchFunction(keyword)
    .pipe(map(members => members.map(m => m.portalUser)));

    memberToString = (member: Member) => member.firstName + " " + member.lastName;

    memberReferenceToString = (memberRef: MemberReference) => memberRef.name;

    @GET("control-center/tickets")
    getTickets(@QueryObject pageableRequest: PageRequest,
               @QueryObject ticketFilters: Object): Observable<Page<Ticket>> {
        return null;
    }

    @GET("control-center/tickets/{id}")
    getTicketDetails(@Path("id") id: number): Observable<TicketDetails> {
        return null;
    }

    @GET("control-center/tickets/members")
    getMembers(@QueryObject filters: Object): Observable<Member[]> {
        return null;
    }

    @GET("control-center/tickets/user/{id}/contact")
    @SkipErrorHandler(404)
    getHelpDeskContactSkipNotFoundHandler(@Path("id") id: number): Observable<HelpDeskContact> {
        return null;
    }

    @POST("control-center/tickets/user/{id}/contact")
    createContact(@Path("id") id: number): Observable<void> {
        return null;
    }

    @POST("control-center/tickets")
    saveTicket(@Body ticket: TicketCreateRequest): Observable<Ticket> {
        return null;
    }

    @PUT("control-center/tickets/{id}")
    updateTicket(@Path("id") id: number, @Body ticket: TicketUpdateRequest): Observable<Response> {
        return null;
    }

    @POST("control-center/tickets/{id}/comments/{customerHasUpdated}")
    saveTicketComment(@Path("id") id: number, @Path("customerHasUpdated") customerHasUpdated: boolean, @Body note: TicketCommentCreateRequest): Observable<Response> {
        return null;
    }

    @POST("control-center/tickets/{ticketId}/attachments")
    uploadAttachment(@Path("control-center/ticketId") ticketId: number, @FileUpload file: File): Observable<void> {
        return null;
    }

    downloadAttachment(attachmentId: number, fileName: string): Observable<void> {
        return this.getAttachment(attachmentId, fileName)
            .pipe(map(file => saveAs(file, fileName)));
    }

    @GET("/tickets/attachments/{attachmentId}")
    /**
     * Add blob as content type
     * HttpClient.Blob removed in angular 8 
     */
    @ResponseType('blob')
    private getAttachment(@Path("attachmentId") attachmentId: number,
                          fileName: string): Observable<Blob> {
        return null;
    }

    getOpenStatuses(statuses: string[]) {
        return statuses.filter(status => this.CLOSED_STATUSES.indexOf(status) < 0);
    }

    getBoardByStatus(status: string) {
        return _.find(this.BOARDS, board => board.statuses.indexOf(status) >= 0);
    }

    severityLevelsArray = [
        {text: "Impact", selectable: false},
        {text: "High Urgency", selectable: false},
        {text: "Medium Urgency", selectable: false},
        {text: "Low Urgency", selectable: false},

        {text: "High", selectable: false},
        {text: "Priority 1 - Multiple Customers Down", priority: "Priority 1", color: "red", urgency: "HIGH", impact: "High", selectable: true, urgencyText: "Whole company is affected", impactText: "Critical - Major business processes are stopped"},
        {text: "Priority 2 - Individual Customers Down", priority: "Priority 2", color: "orange", urgency: "MEDIUM", impact: "High", selectable: true, urgencyText: "Departments or large group of users are affected", impactText: "Critical - Major business processes are stopped"},
        {text: "Priority 3 - Customer Degraded State of Performance", priority: "Priority 3", color: "yellow", urgency: "LOW", impact: "High", selectable: true, urgencyText: "One user or a small group of users is affected", impactText: "Critical - Major business processes are stopped"},

        {text: "Medium", selectable: false},
        {text: "Priority 2 - Individual Customers Down", priority: "Priority 2", color: "orange", urgency: "HIGH", impact: "Medium", selectable: true, urgencyText: "Whole company is affected", impactText: "Business is degraded, but there is a reasonable workaround"},
        {text: "Priority 3 - Customer Degraded State of Performance", color: "yellow", priority: "Priority 3", urgency: "MEDIUM", impact: "Medium", selectable: true, urgencyText: "Departments or large group of users are affected", impactText: "Business is degraded, but there is a reasonable workaround"},
        {text: "Priority 4 - General Customer Issue", urgency: "LOW", priority: "Priority 4", color: "blue", impact: "Medium", selectable: true, urgencyText: "One user or a small group of users is affected", impactText: "Business is degraded, but there is a reasonable workaround"},

        {text: "Low", selectable: false},
        {text: "Priority 3 - Customer Degraded State of Performance", priority: "Priority 3", color: "yellow", urgency: "HIGH", impact: "Low", selectable: true, urgencyText: "Whole company is affected", impactText: "More of an irritation than a stoppage"},
        {text: "Priority 4 - General Customer Issue", priority: "Priority 4", color: "blue", urgency: "MEDIUM", impact: "Low", selectable: true, urgencyText: "Departments or large group of users are affected", impactText: "More of an irritation than a stoppage"},
        {text: "Priority 4 - General Customer Issue", priority: "Priority 4", color: "blue", urgency: "LOW", impact: "Low", selectable: true, urgencyText: "One user or a small group of users is affected", impactText: "More of an irritation than a stoppage"}
    ];

    readonly priorityList: TicketPriority[] = [
        {id: 6, name: "Priority 1 - Multiple Customers Down"},
        {id: 15, name: "Priority 2 - Individual Customers Down"},
        {id: 8, name: "Priority 3 - Customer Degraded State of Performance"},
        {id: 7, name: "Priority 4 - General Customer Issue"}
    ]
}

