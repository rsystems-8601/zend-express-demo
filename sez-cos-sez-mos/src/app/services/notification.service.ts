import {Injectable} from "@angular/core";
import {Body, DELETE, GET, Path, POST, PUT, QueryObject} from "../infra/angular2-rest";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';
import {HttpResponse} from "@angular/common/http";
import {RESTAuthClient} from "../infra/rest-auth-client";
import {Notification} from "../models/notification.model";
import {PageRequest} from "../models/page-request.model";
import {Page} from "../models/page.model";
import {CommonServiceDependencies} from "../infra/common-service-dependencies";
import {FilteringService, Operator} from "./filtering.service";
import {map as _map} from "lodash";
import * as moment from "moment";
import {DateUtils} from "../common/date-utils";
import {Sort} from "../models/sort.model";
import {AuthHolderService} from "./auth-holder.service";

export class NotificationCreateUpdateRequest {
    constructor(public title: string,
                public message: string,
                public startDate: string,
                public endDate: string,
                public organizationIds: number[]) {
    }

    static from(notification: Notification) {
        return new NotificationCreateUpdateRequest(
            notification.title,
            notification.message,
            notification.startDate,
            notification.endDate,
            _map(notification.organizations, org => org.id)
        );
    }
}

@Injectable({
    providedIn:"root"
})
export class NotificationService extends RESTAuthClient {
    constructor(commonDependencies: CommonServiceDependencies,
                private auth: AuthHolderService) {
        super(commonDependencies);
    }

    @GET("control-center/notifications")
    getNotifications(@QueryObject pageableRequest: PageRequest,
                     @QueryObject userFilters: Object): Observable<Page<Notification>> {
        return null;
    }

    getActualNotifications(from = moment(), to = moment()): Observable<Array<Notification>> {
        const dateFilter = FilteringService.builder()
            .and(Operator.GREATER_OR_EQUAL, "endDate", from.format(DateUtils.ISO_DATE_FORMAT))
            .and(Operator.LESS_OR_EQUAL, "startDate", to.format(DateUtils.ISO_DATE_FORMAT))
            .build();
        return this.getNotifications(PageRequest.all(new Sort("startDate")), dateFilter).pipe(map(page => page.content));
    }

    @POST("control-center/notifications")
    saveNotification(@Body notification: NotificationCreateUpdateRequest): Observable<Notification> {
        return null;
    }

    @PUT("control-center/notifications/{id}")
    updateNotification(@Path("id") id: number,
                       @Body notification: NotificationCreateUpdateRequest): Observable<Notification> {
        return null;
    }

    @DELETE("control-center/notifications/{id}")
    deleteNotification(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }
}


