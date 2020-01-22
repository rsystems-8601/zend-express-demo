import {Injectable} from "@angular/core";
import {Body, DELETE, GET, MixedMultipart, Path, POST, PUT, Query, QueryObject, ErrorHandler, SkipErrorHandler} from "../infra/angular2-rest";
import {Observable, Subject} from "rxjs";
import { map } from 'rxjs/operators';
import {HttpResponse} from "@angular/common/http";
import {RESTAuthClient} from "../infra/rest-auth-client";
import {PageRequest} from "../models/page-request.model";
import {Page} from "../models/page.model";
import {CommonServiceDependencies} from "../infra/common-service-dependencies";
import * as _ from "lodash";
import * as moment from "moment";
import {Moment} from "moment";
import {DateUtils} from "../common/date-utils";
import {
    MaintenanceEvent,
    MaintenanceEventWithLocalDates,
    MaintenanceEventWithRecurrencePatterns
} from "../models/maintenance-event.model";
import {UserService} from "./user.service";
import {TranslateService} from "@ngx-translate/core";
import {TicketAttachment, TicketComment} from "../models/ticket.model";
import {TicketCommentCreateRequest} from "./ticket.service";
import { User } from "../models/user.model";
import { Organization } from "../models/organization.model";
import { OrganizationService } from "./organization.service";



export class MaintenanceEventUpdateRequest {
    public recurrencePatternName: string;

    static from(maintenanceEvent: MaintenanceEvent) {
        return new MaintenanceEventUpdateRequest(
            maintenanceEvent.type,
            maintenanceEvent.title,
            maintenanceEvent.message,
            maintenanceEvent.startDateTime,
            maintenanceEvent.endDateTime,
            maintenanceEvent.timezoneOffset,
            maintenanceEvent.reminder,
            maintenanceEvent.cron,
            _.map(maintenanceEvent.organizations, org => org.id),
            maintenanceEvent.crefAttachment,
            maintenanceEvent.severity,
            maintenanceEvent.assignedUser && maintenanceEvent.assignedUser.id,
            maintenanceEvent.repeatUntil,
            _.map(maintenanceEvent.approvers, approvers => approvers.id),
        );
    }

    constructor(public type: string,
                public title: string,
                public message: string,
                public startDateTime: string,
                public endDateTime: string,
                public timezoneOffset: string,
                public reminder: boolean,
                public cron: string,
                public organizationIds: number[],
                public crefAttachment: File [],
                public severity: string,
                public assignedUserId: number,
                public repeatUntil?: string,
                public approverIds?: number[]) {
    }
}

export interface MaintenanceEventProgressUpdateRequest {
    status: string;
    instanceStartDate: string,
    failureReason?: string
}

export interface MaintenanceEventUserAssignmentRequest {
    instanceStartDate: string,
    userId: number
}

export interface MaintenanceEventChangeFreezeCheck {
    maintenanceEvents: Array<MaintenanceEvent>,
    organizations: Organization[],
    approvers: User[]
}

@Injectable({
    providedIn:"root"
})
export class MaintenanceService extends RESTAuthClient {

    static readonly MaintenanceType = {
        MAINTENANCE: "MAINTENANCE",
        DIFFERENTIAL_BACKUP: "DIFFERENTIAL_BACKUP",
        FULL_BACKUP: "FULL_BACKUP",
        DESKTOP_PATCHING: "DESKTOP_PATCHING",
        INFRASTRUCTURE_PATCHING: "INFRASTRUCTURE_PATCHING",
        CHANGE_FREEZE: "CHANGE_FREEZE"
    };

    static readonly ApprovalStatus = {
        PENDING: "PENDING",
        APPROVED: "APPROVED",
        REJECTED: "REJECTED"
    };

    static readonly ProgressStatus = {
        NOT_STARTED: "NOT_STARTED",
        STARTED: "STARTED",
        FINISHED: "FINISHED",
        FAILED: "FAILED"
    };

    static readonly Severity = {
        LOW: "LOW",
        MEDIUM: "MEDIUM",
        HIGH: "HIGH"
    };

    constructor(commonDependencies: CommonServiceDependencies,
                private translate: TranslateService,
                private userService: UserService,
                private organizationService: OrganizationService) {
        super(commonDependencies);
    }

    updates = new Subject<void>();

    update() {
        this.updates.next();
    }

    getMaintenanceEventsWithRecurrencePatterns(pageableRequest: PageRequest,
                                               userFilters: Object): Observable<Page<MaintenanceEventWithRecurrencePatterns>> {
        return this.getMaintenanceEvents(pageableRequest, userFilters).pipe(map(jobsPage => {
            const jobsWithPatterns = jobsPage.content.map(job => MaintenanceEventWithRecurrencePatterns.from(job));
            return new Page(jobsWithPatterns, jobsPage.totalElements);
        }))
    }

    @GET("control-center/maintenance-events")
    getMaintenanceEvents(@QueryObject pageableRequest: PageRequest,
                         @QueryObject userFilters: Object): Observable<Page<MaintenanceEvent>> {
        return null;
    }

    getMaintenanceEventInstance(id: number, startDate: string): Observable<MaintenanceEvent> {
        return this.getMaintenanceEventInstanceInUtc(id, startDate).pipe(map(maintenanceEvent => {
            // use the offset of the first instance to discard the daylight saving time shift
            const originalOffset = DateUtils.getTimezoneOffset(maintenanceEvent.firstInstanceStartDateTime);
            maintenanceEvent.startDateTime = DateUtils.formatDateTime(moment(maintenanceEvent.startDateTime).utcOffset(originalOffset));
            maintenanceEvent.endDateTime = DateUtils.formatDateTime(moment(maintenanceEvent.endDateTime).utcOffset(originalOffset));
            return maintenanceEvent;
        }));
    }

    @GET("control-center/maintenance-events/{id}")
    private getMaintenanceEventInstanceInUtc(@Path("id") id: number, @Query("startDate") startDate: string): Observable<MaintenanceEvent> {
        return null;
    }

    getNextOccurrenceInstance(id: number) {
        return this.getNextOccurrenceInstanceInUtc(id)
        .pipe(map(maintenanceEvent => {
            maintenanceEvent.startDateTime = DateUtils.formatDateTime(moment(maintenanceEvent.startDateTime).utcOffset(DateUtils.getTimezoneOffset(maintenanceEvent.firstInstanceStartDateTime)));
            maintenanceEvent.endDateTime = DateUtils.formatDateTime(moment(maintenanceEvent.endDateTime).utcOffset(DateUtils.getTimezoneOffset(maintenanceEvent.firstInstanceStartDateTime)));
            return maintenanceEvent;
        }));
    }

    @GET("control-center/maintenance-events/{id}/next-occurrence")
    private getNextOccurrenceInstanceInUtc(@Path("id") id: number): Observable<MaintenanceEvent> {
        return null;
    }

    getActualMaintenanceEvents(from: Moment, to: Moment): Observable<Array<MaintenanceEventWithLocalDates>> {
        return this.getMaintenanceEventsInDateRange(DateUtils.formatDateUTC(from), DateUtils.formatDateUTC(to)).pipe(
            map(maintenanceEvents => maintenanceEvents.map(event => MaintenanceEventWithLocalDates.from(event))));
    }

    getAllActualScheduledJobs(from: Moment, to: Moment): Observable<Array<MaintenanceEventWithLocalDates>> {
        return this.getAllScheduledJobsInDateRange(DateUtils.formatDateUTC(from), DateUtils.formatDateUTC(to))
            .pipe(map(maintenanceEvents => maintenanceEvents.map(event => MaintenanceEventWithLocalDates.from(event))));
    }

    @POST("control-center/maintenance-events")
    preCreateMaintenanceEvent(): Observable<MaintenanceEvent> {
        return null;
    }

    @PUT("control-center/maintenance-events/{id}")
    @ErrorHandler("update-maintenance-event")
    updateMaintenanceEvent(@Path("id") id: number,
                           @MixedMultipart("crefAttachment") maintenanceEvent: MaintenanceEventUpdateRequest,
                            @Query("sendToApprove") sendToApprove?: boolean, @Query("softDeleteInstance") softDeleteInstance?: boolean): Observable<MaintenanceEvent> {
        return null;
    }

    @DELETE("control-center/maintenance-events/{id}")
    deleteMaintenanceEvent(@Path("id") id: number, @Query("startDate") startDate?: string): Observable<HttpResponse<any>> {
        return null;
    }

    @PUT("control-center/maintenance-events/inactivate/{id}")
    inactiveMaintenanceEvent(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }

    @POST("control-center/maintenance-events/{id}/approval")
    approveMaintenance(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }

    @DELETE("control-center/maintenance-events/{id}/approval")
    rejectMaintenance(@Path("id") id: number, @Body request: MaintenanceEventProgressUpdateRequest): Observable<HttpResponse<any>> {
        return null;
    }

    getAttachmentUploadUrlFor(maintenanceId: number) {
        return `${this.getBaseUrl()}maintenance-events/${maintenanceId}/attachments`;
    }

    @GET("control-center/maintenance-events/all/date-range")
    private getAllScheduledJobsInDateRange(@Query("from") from: string,
                                           @Query("until") until: string): Observable<Array<MaintenanceEvent>> {
        return null;
    }

    @GET("control-center/maintenance-events/maintenance/date-range")
    private getMaintenanceEventsInDateRange(@Query("from") from: string,
                                            @Query("until") until: string): Observable<Array<MaintenanceEvent>> {
        return null;
    }

    @PUT("control-center/maintenance-events/{id}/status")
    changeStatus(@Path("id") id: number, @Body request: MaintenanceEventProgressUpdateRequest): Observable<MaintenanceEvent> {
        return null;
    }

    @PUT("control-center/maintenance-events/{id}/assigned-user")
    @ErrorHandler("assign-user")
    assignUser(@Path("id") id: number, @Body request: MaintenanceEventUserAssignmentRequest): Observable<MaintenanceEvent> {
        return null;
    }

    @GET("control-center/maintenance-events/{id}/comments")
    getComments(@Path("id") id: number, @Query("startDate") startDate: string): Observable<TicketComment[]> {
        return null;
    }

    @GET("control-center/maintenance-events/{id}/comments/attachments")
    getAttachments(@Path("id") id: number, @Query("startDate") startDate: string): Observable<TicketAttachment[]> {
        return null;
    }

    @POST("control-center/maintenance-events/{id}/comments")
    addComment(@Path("id") id: number,
               @Query("startDate") startDate: string,
               @MixedMultipart("attachment") request: TicketCommentCreateRequest): Observable<void> {
        return null;
    }

    @PUT("control-center/maintenance-events/resend-approval/{id}")
    resendJobApprovalEmail(@Path("id") id: number): Observable<MaintenanceEvent> {
        return null;
    }

    @PUT("control-center/maintenance-event-in-change-freeze")
    getMaintenanceEventInChangeFreeze(@Body maintenanceEvent: MaintenanceEventUpdateRequest): Observable<MaintenanceEventChangeFreezeCheck> {
        return null;
    }

    getAllActualScheduledJobsForOrganizations(from: Moment, to: Moment, orgIds: number[]): Observable<Array<MaintenanceEventWithLocalDates>> {
        return this.getChangeFreezeExistingInMainteneceEvents(DateUtils.formatDateUTC(from), DateUtils.formatDateUTC(to), orgIds.toString())
            .pipe(map(maintenanceEvents => maintenanceEvents.map(event => MaintenanceEventWithLocalDates.from(event))));
    }

    @GET("control-center/maintenance-events-existing")
    getChangeFreezeExistingInMainteneceEvents(@Query("from") from: string, @Query("until") until: string, @Query("orgIds") orgIds: string): Observable<MaintenanceEvent[]> {
        return null;
    }

    preStatusChangeCheckForDiabledOrganizations(job: MaintenanceEvent, progressStatus: string) {
        const ticketStatus = _.groupBy(job.organizations, org => org.ticketing.toUpperCase());
        let message = "";
        if (ticketStatus.DISABLED && progressStatus ===  MaintenanceService.ProgressStatus.STARTED) {
            if (job.organizations.length === ticketStatus.DISABLED.length) {
                if (ticketStatus.DISABLED.length > 1) {
                    this.translate.get("noneOrgTicketEnableConfirmMsg").subscribe(msg => { message = msg });
                } else {
                    this.translate.get("orgTicketNotEnableConfirmMsg").subscribe(msg => { message = msg });
                }
            } else {
                if (ticketStatus.DISABLED.length > 1) {
                    this.translate.get("followingNoneOrgTicketEnabledConfirmMsg", {orgNames: this.organizationService.organizationsToString(ticketStatus.DISABLED) }).subscribe(msg => { message = msg });
                } else {
                    this.translate.get("followingOrgTicketNotEnabledConfirmMsg", {orgName: this.organizationService.organizationsToString(ticketStatus.DISABLED) }).subscribe(msg => { message = msg });
                }
            }
        }
        return message;
    }
}
