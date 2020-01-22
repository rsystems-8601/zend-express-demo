import { Injectable } from '@angular/core';
import { PodManagement } from '../../../models/pod-model/pod-management.model';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

import {
    Body,
    DELETE,
    DisableScoping,
    ErrorHandler,
    FileUpload,
    GET,
    Path,
    POST,
    PUT,
    Query,
    QueryObject,
    Header,
    ResponseType
} from "../../../infra/angular2-rest";
import {Observable, Subject} from "rxjs";

import {CommonServiceDependencies} from "../../../infra/common-service-dependencies";
import {flatMap as _flatMap, padStart as _padStart} from "lodash";

// Custom Services and Models

import { RESTAuthClient } from "../../../infra/rest-auth-client";

// Custom Services and Models


import { Pods, Podlist } from "../../../models/cos-common.model";
import { PrivatevlanCreate } from "../../../models/private-vlan.model";
import { PublicvlanCreate } from "../../../models/public-vlan.model";

export class PrivatevlansCreateUpdateRequest {
    constructor(public dataCenters: string,
                public pod?: number,
                ) 
    { }
}

@Injectable({providedIn:"root"})

export class PublicvlansService extends RESTAuthClient {

    // Subscription to send data
    sharepddcData = new Subject<any>();

    reloadDatarequest = new Subject<any>();

    constructor(public commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

   
    sendDataPod(somedata:any){
        this.sharepddcData.next(somedata);
    }

    getReloaddata(reloadValue:number) {
        this.sharepddcData.next(reloadValue);
     }
   

    @GET("cosmos-portal/common/list/pods/{datacenterId}")
    getPodList(@Path("datacenterId") datacenterId: number ): Observable<Pods[]> {
        return null;
    }

    @POST("cosmos-portal/vlanpublic/search/filter")
    getPublicVlanListData(@Body privatevlanRequest: any): Observable<any> {
        return null;
    }

   
    @PUT("cosmos-portal/vlan/create")
    // @ErrorHandler("vlan/create")
    createPrivatevlan(@Body vlandata: PrivatevlanCreate): Observable<PrivatevlanCreate> {
        return null;
    }

    @POST("cosmos-portal/vlanpublic/create")
    // @ErrorHandler("vlan/create")
    createPublicvlan(@Body vlandata: PublicvlanCreate): Observable<PublicvlanCreate> {
        return null;
    }

    @DELETE("cosmos-portal/vlan/deleteVlansInRange")
    //@ErrorHandler("partner/deleter")
    deletePublicvlan(@Body deleteVlandata: PrivatevlanCreate): Observable<any> {
        return null;
    }

    @DELETE("cosmos-portal/vlanpublic/delete/{pvlanId}")
    //@ErrorHandler("delete-user")
    deletePublicVlan(@Path("pvlanId") pvlanId: number): Observable<any> {
        return null;
    }


  
}

