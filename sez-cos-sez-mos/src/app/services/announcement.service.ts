import {Injectable} from "@angular/core";
import {Announcement, AnnouncementCreateUpdateRequest} from "../models/announcement.model";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {Body, DELETE, GET, Path, POST, PUT, QueryObject} from "../infra/angular2-rest";
import {RESTAuthClient} from "../infra/rest-auth-client";
import {CommonServiceDependencies} from "../infra/common-service-dependencies";
import {Page} from "../models/page.model";
import {PageRequest} from "../models/page-request.model";
import {FilteringService, Operator} from "./filtering.service";
import * as moment from "moment";
import {clone as _clone, filter as _filter} from "lodash";
import {HttpResponse} from "@angular/common/http";
import {AuthHolderService} from "./auth-holder.service";
import {DateUtils} from "../common/date-utils";
import {Sort} from "../models/sort.model";
import {LocalStorage} from "ngx-webstorage";

@Injectable({
    providedIn:"root"
})
export class AnnouncementService extends RESTAuthClient {
    @LocalStorage("doNotShowAnnouncementsIds") private doNotShowAnnouncementsIds;

    constructor(commonDependencies: CommonServiceDependencies,
                private auth: AuthHolderService) {
        super(commonDependencies);
        if (!this.doNotShowAnnouncementsIds) {
            this.doNotShowAnnouncementsIds = {};
        }
    }

    doNotShowAgain(id: number) {
        const clone = _clone(this.doNotShowAnnouncementsIds);
        clone[id] = true;
        this.doNotShowAnnouncementsIds = clone;
    }

    getActualAnnouncements(): Observable<Announcement[]> {
        const filters = FilteringService.builder()
            .and(Operator.ARE_MEMBERS, "organizations", this.auth.getAuthentication().organizationId.toString())
            .and(Operator.GREATER_OR_EQUAL, "endDate", moment().format(DateUtils.ISO_DATE_FORMAT))
            .and(Operator.LESS_OR_EQUAL, "startDate", moment().format(DateUtils.ISO_DATE_FORMAT))
            .build();

        return this.getAnnouncements(PageRequest.all(new Sort("startDate")), filters)
            .pipe(
            map(page => page.content),
            map(announcements => _filter(announcements, announcement =>
                !this.doNotShowAnnouncementsIds[announcement.id]))
            ); 
    }

    @GET("control-center/announcements")
    getAnnouncements(@QueryObject pageRequest: PageRequest,
                     @QueryObject filters: Object): Observable<Page<Announcement>> {
        return null;
    };

    @POST("control-center/announcements")
    preCreateAnnouncement(): Observable<Announcement> {
        return null;
    }

    @PUT("control-center/announcements/{id}")
    updateAnnouncement(@Path("id") id: number,
                       @Body announcement: AnnouncementCreateUpdateRequest): Observable<Announcement> {
        return null;
    }

    @DELETE("control-center/announcements/{id}")
    deleteAnnouncement(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }

    getAttachmentUploadUrlFor(announcementId: number) {
        return `${this.getBaseUrl()}announcements/${announcementId}/attachments`;
    }
}