import {Injectable} from "@angular/core";
import {Observable, } from "rxjs";
import { map } from 'rxjs/operators';

import {HttpResponse} from "@angular/common/http";
import {Page} from "../../../models/page.model";
import {map as _map} from "lodash";
import { RESTAuthClient } from '../../../infra/rest-auth-client';
import { CommonServiceDependencies } from '../../../infra/common-service-dependencies';
import { PageRequest } from '../../../models/page-request.model';
import { ShortEntityInfo } from '../../../models/short-entity-info.model';
import { GET, QueryObject, Path, POST, Body, PUT, DELETE } from '../../../infra/angular2-rest';
import { FiltersBuilder, Operator } from '../../../services/filtering.service';
import { Application } from '../../../models/application.model';

export class ApplicationCreateUpdateRequest {
    constructor(public name: string,
                public description: string,
                public url: string,
                public applicationGroupIds: Array<number>,
                public horizon: boolean) {
    }

    static from(application: Application): ApplicationCreateUpdateRequest {
        return new ApplicationCreateUpdateRequest(
            application.name,
            application.description,
            application.url,
            <Array<number>> _map(application.applicationGroups, "id"),
            application.horizon
        );
    }
}

@Injectable({
    providedIn:"root"
})
export class ApplicationService extends RESTAuthClient {

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    applicationSearchFunction = (keyword: string) => this.getApplications(PageRequest.all(), this.appSearchFilter(keyword))
        .pipe(map(page => page.content));

    applicationShortInfoSearchFunction = (keyword: string) => this.applicationSearchFunction(keyword)
        .pipe(map(apps => _map(apps, app => new ShortEntityInfo(app.id, app.name))));

    organizationAppShortInfoSearchFunction = (orgId: number, keyword: string) => this.getOrganizationApplications(
        orgId, PageRequest.all(), this.appSearchFilter(keyword)).pipe(map(page => page.content));

    applicationToString = (app: Application) => app.name;

    @GET("control-center/applications")
    getApplications(@QueryObject pageRequest: PageRequest,
                    @QueryObject filters: Object): Observable<Page<Application>> {
        return null;
    };

    @GET("organizations/{id}/applications")
    getOrganizationApplications(@Path("id") id: number,
                                @QueryObject pageRequest: PageRequest,
                                @QueryObject filters: Object): Observable<Page<Application>> {
        return null;
    };

    @GET("control-center/applications/{id}")
    getApplication(@Path("id") id: number): Observable<Application> {
        return null;
    };

    @GET("control-center/applications/starred")
    getStarredApplications(): Observable<Application[]> {
        return null;
    };

    @POST("control-center/applications")
    saveApplication(@Body application: ApplicationCreateUpdateRequest): Observable<Application> {
        return null;
    }

    @PUT("control-center/applications/{id}")
    updateApplication(@Path("id") id: number,
                      @Body application: ApplicationCreateUpdateRequest): Observable<Application> {
        return null;
    }

    @DELETE("control-center/applications/{id}")
    deleteApplication(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }

    @POST("control-center/applications/{id}/star")
    starApplication(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }

    @DELETE("control-center/applications/{id}/star")
    unstarApplication(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }

    private appSearchFilter(keyword: string) {
        return new FiltersBuilder()
            .or(Operator.CONTAINS, "name", keyword)
            .or(Operator.CONTAINS, "description", keyword)
            .build();
    }
}

