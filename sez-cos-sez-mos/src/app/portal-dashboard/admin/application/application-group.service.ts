
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import { RESTAuthClient } from '../../../infra/rest-auth-client';
import { PageRequest } from '../../../models/page-request.model';
import { FilteringService,Operator } from '../../../services/filtering.service';
import { CommonServiceDependencies } from '../../../infra/common-service-dependencies';
import { GET, QueryObject, POST, Body, PUT, Path, DELETE,Query, ErrorHandler } from '../../../infra/angular2-rest';
import { Page } from '../../../models/page.model';
import { HttpResponse } from '@angular/common/http';
import { ApplicationGroup } from '../../../models/application-group.model';

export class ApplicationGroupCreateUpdateRequest {
    constructor(public name: string,
                public organizationIds: number[],
                public enabled: boolean) {
    }
}

@Injectable({
    providedIn:"root"
})
export class ApplicationGroupService extends RESTAuthClient {
    appGroupsSearch = (name) =>
        this.getAppGroups(PageRequest.all(), FilteringService.builder()
            .and(Operator.CONTAINS, "name", name)
            .build())
            .pipe(map(page => page.content));

    appGroupsForEditingSearch = (name) => this.appGroupsSearch(name)
        .pipe(map(appGroups => appGroups.filter(appGroup => appGroup.editable)));

    applicationGroupToString = (group: ApplicationGroup) => group && group.name;
    applicationGroupsToString = (groups: ApplicationGroup[]) => groups && groups.map(group => group.name);

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    @GET("control-center/application-groups")
    getAppGroups(@QueryObject pageRequest: PageRequest,
                 @QueryObject filters: Object): Observable<Page<ApplicationGroup>> {
        return null;
    };

    @GET("control-center/application-groups/name/uniqueness")
    checkNameUnique(@Query("name") name: string): Observable<boolean> {
        return null;
    }

    @POST("control-center/application-groups")
    saveAppGroup(@Body appGroup: ApplicationGroupCreateUpdateRequest): Observable<ApplicationGroup> {
        return null;
    }

    @PUT("control-center/application-groups/{id}")
    updateAppGroup(@Path("id") id: number, @Body appGroup: ApplicationGroupCreateUpdateRequest): Observable<ApplicationGroup> {
        return null;
    }

    @DELETE("control-center/application-groups/{id}")
    @ErrorHandler("delete-app-group")
    deleteAppGroup(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }
}

