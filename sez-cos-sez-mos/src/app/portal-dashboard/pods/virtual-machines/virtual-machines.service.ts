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

// Custom Services and Models
import { Pods, HardwareClusters, CreateHardwarecluster } from "../../../models/cos-common.model";
import { RESTAuthClient } from 'src/app/infra/rest-auth-client';
import { VirtualMachines } from 'src/app/models/virtual-machines.model';


export class VirtualMachinesCreateUpdateRequest {
    constructor(public id: number,
                public machineName?: string,
                public osVersion?:number
                ) 
    { }
}

@Injectable({providedIn:"root"})

export class VirtualMachinesService extends RESTAuthClient {

    // Subscription to send data
    sharePoddata = new Subject<any>();
    reloadDatarequest = new Subject<any>();
    private podId: number;
    constructor(public commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    setPodId(podId:number){
        this.podId = podId;
        this.sharePoddata.next(podId);
    }

    getpodId(){
        return this.podId;
    }
    getReloaddata(reloadValue:boolean) {
       this.reloadDatarequest.next(reloadValue);
    }
   
    @GET("cosmos-portal/common/list/pods/{datacenterId}")
    getPodList(@Path("datacenterId") datacenterId: number ): Observable<Pods[]> {
        return null;
    }

    @GET("cosmos-portal/common/list/hwcluster/{podId}")
    getvirtualMachinerData(@Path("podId") podId: number ): Observable<VirtualMachines> {
        return null;
    }

    @GET("cosmos-portal/pods/getAllVirtualMachines")
    getAllVirtualMachines(): Observable<VirtualMachines> {
        return null;
    }
   
    @PUT("cosmos-portal/hwcluster/create/hwcluster")
    // @ErrorHandler("vlan/create")
    createHardwareCluster(@Body hardwarecluster: CreateHardwarecluster): Observable<VirtualMachines> {
        return null;
    }

    
    @DELETE("cosmos-portal/hwcluster/delete/hwcluster/{clusterId}")
    //@ErrorHandler("delete-user")
    getDeleteHardwarecluster(@Path("clusterId") clusterId: number): Observable<VirtualMachines> {
        return null;
    }

    @POST("cosmos-portal/pods/saveVirtualMachine")
    saveVirtualmachine(@Body virtualMachionesave: any): Observable<VirtualMachines> {
        return null;
    }

    @POST("cosmos-portal/pods/updateVirtualMachine")
    updateVirtualmachine(@Body virtualMachine: any): Observable<VirtualMachines> {
        return null;
    }

    @POST("cosmos-portal/customer/search/name")
    searchCustomer(@Body custName: any): Observable<any> {
        return null;
    }

  
}

