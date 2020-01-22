import {Injectable} from "@angular/core";
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

import { RESTAuthCosmosClient } from "../../../infra/RESTAuthCosmosClient";
import { Pods, Podlist } from "../../../models/cos-common.model";
import { PrivatevlanCreate } from "../../../models/private-vlan.model";
import { Poddetails, torSwitches, tenGBSwitches, iPMISwitches, Servers } from "../../../models/poddetails.model";


export class PodsCreateUpdateRequest {
    constructor(public dataCenters: string,
                public pod?: number,
                ) 
    { }
}

@Injectable({providedIn:"root"})

export class PodsmanagementService extends RESTAuthCosmosClient {

    // Subscription to send data
    sharepddcData = new Subject<any>();
    sharetorInfo = new Subject<any>();
    sharetengbInfo = new Subject<any>();
    shareipmiInfo = new Subject<any>();
    shareserverInfo = new Subject<any>();
    sharestorageInfo = new Subject<any>();
    shareSinglepodid = new Subject<any>();


    constructor(public commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

   
    sendDataPod(somedata:any){
        this.sharepddcData.next(somedata);
    }
    sendSinglepodid(sendSingledata) {
        this.shareSinglepodid.next(sendSingledata);
    }
    sendtorInfo(data:torSwitches[]) {
        this.sharetorInfo.next(data);
    }
    sendtengbInfo(data:tenGBSwitches[]) {
        this.sharetengbInfo.next(data);
    }
    sendipmiInfo(data:iPMISwitches[]) {
        this.shareipmiInfo.next(data);
    }

    sendserverInfo(data:Servers[]) {
        this.shareserverInfo.next(data);
    }
   
    sendstorageInfo(data:Storage[]) {
        this.sharestorageInfo.next(data);
    }

    @GET("common/list/pods/{datacenterId}")
    getPodList(@Path("datacenterId") datacenterId: number ): Observable<Pods[]> {
        return null;
    }

    @GET("pods/find/{podId}")
    getPodDetails(@Path("podId") podId: number ): Observable<Poddetails[]> {
        return null;
    }

    @POST("vlan/search/filter")
    getprivateListdata(@Body privatevlanRequest: any): Observable<any> {
        return null;
    }

   
    @PUT("vlan/create")
    // @ErrorHandler("vlan/create")
    createPrivatevlan(@Body vlandata: PrivatevlanCreate): Observable<PrivatevlanCreate> {
        return null;
    }

    @DELETE("vlan/deleteVlansInRange")
    //@ErrorHandler("partner/deleter")
    deletePrivatevlan(@Body deleteVlandata: PrivatevlanCreate): Observable<PrivatevlanCreate> {
        return null;
    }


  
}

