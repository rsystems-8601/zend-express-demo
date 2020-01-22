
import {Injectable} from "@angular/core";
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {map as _map} from "lodash";
import { RESTAuthClient } from 'src/app/infra/rest-auth-client';
import { FilteringService, Operator } from 'src/app/services/filtering.service';
import { PageRequest } from 'src/app/models/page-request.model';
import { Sort } from 'src/app/models/sort.model';
import { CommonServiceDependencies } from 'src/app/infra/common-service-dependencies';
import { GET, QueryObject, POST, Body, PUT, Path, DELETE,Query} from 'src/app/infra/angular2-rest';
import { Page } from 'src/app/models/page.model';
import { OrganizationGroup } from 'src/app/models/organization-group.model';

export class OrgGroupCreateUpdateRequest {
    constructor(public name: string, public organizationIds: number[]) {
    }

    static from(orgGroup: OrganizationGroup): OrgGroupCreateUpdateRequest {
        return new OrgGroupCreateUpdateRequest(orgGroup.name, <number[]>_map(orgGroup.organizations, "id"));
    }
}

@Injectable({
    providedIn:"root"
})
export class OrganizationGroupService extends RESTAuthClient {

    organizationGroupsSearchFunction = (name: string) => {
        const filterByName = FilteringService.builder().and(Operator.CONTAINS, "name", name).build();
        return this.getOrgGroups(PageRequest.all(new Sort("name")), filterByName).pipe(map(page => page.content));
    };

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    @GET("control-center/organization-groups")
    getOrgGroups(@QueryObject pageRequest: PageRequest,
                 @QueryObject filters: Object): Observable<Page<OrganizationGroup>> {
        return null;
    };

    @GET("control-center/organization-groups/name/uniqueness")
    checkNameUnique(@Query("name") name: string): Observable<boolean> {
        return null;
    }

    @POST("control-center/organization-groups")
    saveOrgGroup(@Body orgGroup: OrgGroupCreateUpdateRequest): Observable<OrganizationGroup> {
        return null;
    }

    @PUT("control-center/organization-groups/{id}")
    updateOrgGroup(@Path("id") id: number, @Body orgGroup: OrgGroupCreateUpdateRequest): Observable<OrganizationGroup> {
        return null;
    }

    @DELETE("control-center/organization-groups/{id}")
    deleteOrgGroup(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }
}

