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

import { RESTAuthClient } from "../../../infra/rest-auth-client"

// Custom Services and Models

import { Pods, Podlist } from "../../../models/cos-common.model";

import { Vrrpmodeldata } from '../../../models/vrrp.model';


export class PrivatevlansCreateUpdateRequest {
    constructor(public dataCenters: string,
                public pod?: number,
                ) 
    { }
}

@Injectable({providedIn:"root"})

export class VrrpgroupService extends RESTAuthClient {

    // Subscription to send data
    sharepddcData = new Subject<any>();
    reloadDatarequest = new Subject<any>();

    constructor(public commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

   
    sendDataPod(somedata:any){
        this.sharepddcData.next(somedata);
    }

    getReloaddata(reloadValue:boolean) {
        this.reloadDatarequest.next(reloadValue);
     }
   

    @GET("cosmos-portal/common/list/pods/{datacenterId}")
    getPodList(@Path("datacenterId") datacenterId: number ): Observable<Pods[]> {
        return null;
    }

    @POST("cosmos-portal/vrrp/search/filter")
    getvrrpListdata(@Body privatevlanRequest: any): Observable<any> {
        return null;
    }

   
    @PUT("cosmos-portal/vlan/create")
    // @ErrorHandler("vlan/create")
    createPrivatevlan(@Body vlandata: Vrrpmodeldata): Observable<Vrrpmodeldata> {
        return null;
    }

    @DELETE("cosmos-portal/vlan/deleteVlansInRange")
    //@ErrorHandler("partner/deleter")
    deletePrivatevlan(@Body deleteVlandata: Vrrpmodeldata): Observable<Vrrpmodeldata> {
        return null;
    }

    @DELETE("cosmos-portal/vrrp/delete/vrrpGroup/{vrrpgroupId}")
    //@ErrorHandler("delete-user")
    deleteVrrpgroup(@Path("vrrpgroupId") vrrpgroupId: number): Observable<Vrrpmodeldata> {
        return null;
    }


  
}

