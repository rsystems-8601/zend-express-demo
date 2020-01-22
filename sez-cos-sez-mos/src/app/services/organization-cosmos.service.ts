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
import { countryView, stateView, cityView } from '../models/address1.model';
import { UserRole } from '../models/provisioning/provision-user-role.model';




@Injectable({
    providedIn:"root"
})
export class OrganizationCosmosService extends RESTAuthClient {

     
    @POST("security/organizations/search")
    getOrganizations(@Body filter: any): Observable<any> {
        return null;
    }
    @POST("security/organizations/create")
    create(@Body organization: any): Observable<any> {
        return null;
    }
    @POST("security/organizations/update")
    update(@Body organization: any): Observable<any> {
        return null;
    }
      // All Country loads...
      @GET("security/common/list/country")
      getCountry(): Observable<countryView[]> {
         return null;
      }
      // All States loads on the basis of country Id...
     @GET("security/common/list/state/{countryId}")
     getState(@Path("countryId") countryId: number ): Observable<stateView[]> {
         return null;
     }

     @GET("security/common/list/city/{stateId}")
     getCity(@Path("stateId") stateId: number): Observable<cityView[]> {
         return null;
     }
     @POST("security/user/search/filter")
     getUsers(@Body filter: any): Observable<any> {
         return null;
     }
     @DELETE("security/organizations/delete/{id}")
     //@ErrorHandler("delete-user")
     deleteOrganization(@Path("id") id: number): Observable<any> {
         return null;
     }

    @GET("cosmos-portal/provisioning/get/roleUser/{orgId}")
        getRoleUser(@Path("orgId") orgId: number ): Observable<UserRole> {
            return null;
     }
     orgnaizationToString = (org: any) => org ? `${org.name}` : "";
   

}

