import {Injectable} from "@angular/core";
import {
    Body,
    DELETE,
    DisableScoping,
    ErrorHandler,
    GET,
    Path,
    POST,
    Query,
    QueryObject,
    ResponseType,
    PUT
} from "../../../infra/angular2-rest";
import {Observable} from "rxjs";
import {CommonServiceDependencies} from "../../../infra/common-service-dependencies";
import {flatMap as _flatMap, padStart as _padStart} from "lodash";

// Custom Services and Models

import { Datacenter, rackType } from "../../../models/cos-common.model";
import { RESTAuthClient } from 'src/app/infra/rest-auth-client';
import { HttpResponse } from '@angular/common/http';
import { countryView, stateView, cityView, Datacenterdetails } from 'src/app/models/datacenterdetails.model';



@Injectable({providedIn:"root"})

export class CoscommonService extends RESTAuthClient {

    constructor(public commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

  
    @GET("cosmos-portal/common/list/datacenter")
    getDatacenterList(): Observable<Datacenter[]> {
       return null;
    }

    @GET("cosmos-portal/dataCenter/find/{podId}")
    getDatacenterDetails(@Path("podId") podId: number): Observable<HttpResponse<any>> {
        return null;
    }

    @GET("cosmos-portal/common/racktypes")
    getrackType(): Observable<rackType> {
        return null;
    }


    @GET("cosmos-portal/common/powertypes")
    getpowerType(): Observable<rackType> {
        return null;
    }

    @GET("cosmos-portal/common/list/country")
    getCountry(): Observable<countryView> {
        return null;
    }

    @GET("cosmos-portal/common/list/state/{countryid}")
    getState(@Path("countryid") countryid: any): Observable<stateView> {
        return null;
    }

    @GET("cosmos-portal/common/list/city/{stateid}")
    getCity(@Path("stateid") stateid: any): Observable<cityView> {
        return null;
    }

    @PUT("cosmos-portal/dataCenter/create")
    saveDatacenter(@Body datacenter: any): Observable<Datacenterdetails> {
        return null;
    }

    @POST("cosmos-portal/dataCenter/update")
    updateDatacenter(@Body datacenter: any): Observable<Datacenterdetails> {
        return null;
    }

    


}

