import { Injectable } from '@angular/core';
import { Datacenter } from '../../models/cos-common.model';
import { PodManagement } from '../../models/pod-model/pod-management.model';
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
} from "../../infra/angular2-rest";
import { Observable, Subject } from "rxjs";

import { CommonServiceDependencies } from "../../infra/common-service-dependencies";
import { flatMap as _flatMap, padStart as _padStart } from "lodash";

// Custom Services and Models

import { RESTAuthClient } from "../../infra/rest-auth-client"
import { Pods, Podlist } from "../../models/cos-common.model";
import { PrivatevlanCreate } from "../../models/private-vlan.model";
import { Poddetails, torSwitches, tenGBSwitches, iPMISwitches, Servers } from "../../models/poddetails.model";


@Injectable({ providedIn: "root" })

export class PodServicesService extends RESTAuthClient {

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

    @GET("cosmos-portal/common/list/datacenter")
    getDatacenterList(): Observable<Datacenter[]> {
        return null;
    }

    sendDataPod(somedata: any) {
        this.sharepddcData.next(somedata);
    }
    sendSinglepodid(sendSingledata) {
        this.shareSinglepodid.next(sendSingledata);
    }
    sendtorInfo(data: torSwitches[]) {
        this.sharetorInfo.next(data);
    }
    sendtengbInfo(data: tenGBSwitches[]) {
        this.sharetengbInfo.next(data);
    }
    sendipmiInfo(data: iPMISwitches[]) {
        this.shareipmiInfo.next(data);
    }

    sendserverInfo(data: Servers[]) {
        this.shareserverInfo.next(data);
    }

    sendstorageInfo(data: Storage[]) {
        this.sharestorageInfo.next(data);
    }

    @GET("cosmos-portal/common/list/pods/{datacenterId}")
    getPodList(@Path("datacenterId") datacenterId: number): Observable<Pods[]> {
        return null;
    }

    @GET("cosmos-portal/pods/find/{podId}")
    getPodDetails(@Path("podId") podId: number): Observable<Poddetails[]> {
        return null;
    }

    @POST("cosmos-portal/vlan/search/filter")
    getprivateListdata(@Body privatevlanRequest: any): Observable<any> {
        return null;
    }

    @POST("cosmos-portal/agentConfiguration/saveAppliance")
    savePods(@Body appliencedata: any): Observable<Poddetails> {
        return null;
    }

    @PUT("cosmos-portal/pods/create")
    savePodData(@Body poddata: any): Observable<Poddetails> {
        return null;
    }

    @POST("cosmos-portal/pods/update")
    updatePodData(@Body poddata: any): Observable<Poddetails> {
        return null;
    }



    @PUT("cosmos-portal/vlan/create")
    // @ErrorHandler("vlan/create")
    createPrivatevlan(@Body vlandata: PrivatevlanCreate): Observable<PrivatevlanCreate> {
        return null;
    }

    @DELETE("cosmos-portal/vlan/deleteVlansInRange")
    //@ErrorHandler("partner/deleter")
    deletePrivatevlan(@Body deleteVlandata: PrivatevlanCreate): Observable<PrivatevlanCreate> {
        return null;
    }

    // Save pod data 

    @POST("cosmos-portal/pods/update")
    savePoddata(@Body podDatatosave: Poddetails): Observable<Poddetails[]> {
        return null;
    }

    @PUT("cosmos-portal/pods/create")
    createPod(@Body poddata: JSON): Observable<Poddetails> {
        return null;
    }
    // Get datacenter detail
    @GET("cosmos-portal/dataCenter/find/{datacenterId}")
    getDatacenterdetails(@Path("datacenterId") datacenterId: number): Observable<any> {
        return null;
    }

    // Get pod detail
    @GET("cosmos-portal/pods/find/{podId}")
    getPoddetails(@Path("podId") podId: number): Observable<any> {
        return null;
    }

}
