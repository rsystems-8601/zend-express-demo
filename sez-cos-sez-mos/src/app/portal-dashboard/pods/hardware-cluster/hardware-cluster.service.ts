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


export class HardwareClusterCreateUpdateRequest {
    constructor(public id: number,
                public name?: string,
      
                ) 
    { }
}

@Injectable({providedIn:"root"})

export class HardwareclusterService extends RESTAuthClient {

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
    gethardwareclusterData(@Path("podId") podId: number ): Observable<HardwareClusters> {
        return null;
    }
   
    @PUT("cosmos-portal/hwcluster/create/hwcluster")
    // @ErrorHandler("vlan/create")
    createHardwareCluster(@Body hardwarecluster: CreateHardwarecluster): Observable<CreateHardwarecluster> {
        return null;
    }

    

    @DELETE("cosmos-portal/hwcluster/delete/hwcluster/{clusterId}")
    //@ErrorHandler("delete-user")
    getDeleteHardwarecluster(@Path("clusterId") clusterId: number): Observable<CreateHardwarecluster> {
        return null;
    }

    @POST("cosmos-portal/hwcluster/update/hwcluster")
    savehardwareCluster(@Body podDatatosave: any): Observable<CreateHardwarecluster> {
        return null;
    }



  
}

