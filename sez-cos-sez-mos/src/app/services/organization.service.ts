import {Injectable} from "@angular/core";
import {Organization, OrganizationType, ShortOrganizationInfo, SupportContacts} from "../models/organization.model";
import {
    Body,
    DELETE,
    DisableScoping,
    ErrorHandler,
    GET,
    Path,
    POST,
    PUT,
    Query,
    QueryObject
} from "../infra/angular2-rest";
import {Observable, pipe} from "rxjs";
import { map } from 'rxjs/operators';
import {HttpResponse} from "@angular/common/http";
import {RESTAuthClient} from "../infra/rest-auth-client";
import {FilteringService, Operator} from "./filtering.service";
import {CommonServiceDependencies} from "../infra/common-service-dependencies";
import * as _ from "lodash";
import { PageRequest } from '../models/page-request.model';
import { Sort } from '../models/sort.model';
import { Page } from '../models/page.model';


export class OrganizationCreateRequest {
    constructor(public name: string,
                public customerId: string,
                public parentOrganizationId: number,
                public type: string,
                public enabled: boolean,
                public compliant: boolean,
                public twoFactorAuth: boolean,
                public ticketing: string,
                public supportPhoneNumber?: string,
                public customerRelationshipManagerId?: number,
                public serviceDeliveryManagerId?: number,
                public starredApplicationIds?: number[]) {
    }
}

export class OrganizationUpdateRequest {
    constructor(public customerId: string,
                public name: string,
                public enabled: boolean,
                public compliant: boolean,
                public twoFactorAuth: boolean,
                public ticketing: string,
                public supportPhoneNumber?: string,
                public customerRelationshipManagerId?: number,
                public serviceDeliveryManagerId?: number,
                public starredApplicationIds?: number[],
                public parentOrganizationId?: number) {
    }
}

@Injectable({
    providedIn:"root"
})
export class OrganizationService extends RESTAuthClient {

    static readonly DizzionName = "Dizzion";
    static readonly DizzionId = 2;

    static readonly TicketingStates: string[] = [
        "ENABLED",
        "DISABLED",
        "READONLY"
    ];

    static readonly OrganizationTypes: string[] = _(OrganizationType)
        .values()
        .filter(value => typeof value === "string")
        .map(value => <string><unknown>value)
        .value();

    organizationsSearchFunction = (keyword: string) => {
        const filter = FilteringService.builder()
            .or(Operator.CONTAINS, "name", keyword)
            .or(Operator.CONTAINS, "customerId", keyword)
            .build();
        return this.getOrganizations(PageRequest.all(new Sort("name")), filter).pipe(map(page => page.content));
    };

    organizationsSearchWithoutScoping = (keyword: string) => {
        const filter = FilteringService.builder()
            .or(Operator.CONTAINS, "name", keyword)
            .or(Operator.CONTAINS, "customerId", keyword)
            .build();
        return this.getOrganizationsWithoutScoping(PageRequest.all(new Sort("name")), filter).pipe(map(page => page.content));
    };

    organizationToString = (org: Organization | ShortOrganizationInfo) => org && org.customerId + " - " + org.name;
    organizationsToString = (orgs: Organization[]) => orgs && orgs.map(org => org.name).join(", ");

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    @GET("control-center/organizations")
    getOrganizations(@QueryObject pageRequest: PageRequest,
                     @QueryObject filters: Object): Observable<Page<Organization>> {
        return null;
    }

    @GET("control-center/organizations/{id}")
    getOrganization(@Path("id") id: number): Observable<Organization> {
        return null;
    }

    getDizzion(): Observable<Organization> {
        return this.getOrganization(OrganizationService.DizzionId);
    }

    @GET("control-center/organizations")
    @DisableScoping()
    getOrganizationsWithoutScoping(@QueryObject pageRequest: PageRequest,
                                   @QueryObject filters: Object): Observable<Page<Organization>> {
        return null;
    }

    @GET("control-center/organizations/{id}/support-contacts")
    getSupportContacts(@Path("id") id: number): Observable<SupportContacts> {
        return null;
    }

    @POST("control-center/organizations")
    saveOrganization(@Body organization: OrganizationCreateRequest): Observable<Organization> {
        return null;
    }

    @PUT("control-center/organizations/{id}")
    @ErrorHandler("update-org")
    updateOrganization(@Path("id") id: number,
                       @Body organization: OrganizationUpdateRequest): Observable<Organization> {
        return null;
    }

    @DELETE("control-center/organizations/{id}")
    @ErrorHandler("delete-organization")
    deleteOrganization(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }

    @GET("control-center/organizations/name/uniqueness")
    checkNameUnique(@Query("orgName") orgName: string): Observable<boolean> {
        return null;
    }

    @GET("control-center/organizations/cid/uniqueness")
    checkCustomerIdUnique(@Query("customerId") customerId: string): Observable<boolean> {
        return null;
    }
}

