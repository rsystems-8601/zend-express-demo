import { Injectable } from '@angular/core';
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
} from "../../../../infra/angular2-rest";

import {Observable, Subject} from "rxjs";

import {HttpResponse } from "@angular/common/http";
// import {RESTAuthClient} from "../../infra/rest-auth-client";

import {CommonServiceDependencies} from "../../../../infra/common-service-dependencies";
import {flatMap as _flatMap, padStart as _padStart} from "lodash";
import { RESTAuthClient } from 'src/app/infra/rest-auth-client';

import { Datacenter, Pods } from 'src/app/models/cos-common.model';
import { Pcvdc, VirtualMachines, Pcvdccomponent } from 'src/app/models/pcvdc.model';



// Custom Services and Models


export class HardwareCreateUpdateRequest {
    constructor(public customerName: string,
                public product?: string,
                public datacenter?: string,
                public pod?: string,
                public dvSwitch?:string,
                public dvPortGroup?:string
                ) 
    { }
}



@Injectable()

export class PcvdcService extends RESTAuthClient {


    shareDataSubject = new Subject<any>();

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    sendDataToOtherComponent(somedata:any){
        this.shareDataSubject.next(somedata);
    }
  
    
 

    // Data center list
    @GET("cosmos-portal/common/list/datacenter")
    getDatacenterlist(): Observable<Datacenter[]> {
        return null;
    }

    // Pod  list
    @GET("cosmos-portal/common/list/pods/{datacenterId}")
    getPodlistdata(@Path("datacenterId") datacenterId: number): Observable<Pods[]> {
        return null;
    }


     // VM list
     @GET("cosmos-portal/pods/getAvailableVirtualMachinesByPodId/{podId}")
     getVirtualmachine(@Path("podId") podId: number): Observable<VirtualMachines[]> {
         return null;
     }

     @GET("cosmos-portal/lookup/getAllLookupByType/{lookupId}")
     getPcvdccomponents(@Path("lookupId") lookupId: number): Observable<Pcvdccomponent[]> {
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
    


    @PUT("cosmos-portal/pods/hardware/update")
    updateHardware(@Body hardwareData: any): Observable<Pcvdc> {
        return null;
    }
    

     // All Datacenter loads...
     @GET("common/list/datacenter")
     getDatacenter(): Observable<any> {
        return null;
     }

    // All States loads on the basis of country Id...
    @GET("common/list/pods/{datacenterId}")
    getDatacenterPod(@Path("datacenterId") datacenterId: number ): Observable<any> {
        return null;
    }


     // Get hardware Cluster and vrrp group
     @GET("cosmos-portal/customerAssignment/getPodChildren/{podId}")
     getHardwareVrrpgroup(@Path("podId") podId: number ): Observable<any> {
         return null;
     }

  

    @GET("common/list/pods/{datacenterId}")
    getPodlist(@Path("datacenterId") datacenterId:number): Observable<any[]> { 
        return null;
    }


     // Search Customer
  @POST("cosmos-portal/customer/search/name")
  searchCustomer(@Body custName: any): Observable<any> {
    return null;
  }

  @POST("cosmos-portal/customerAssignment/getAvailablePublicIps")
  searchPublicIps(@Body custName: any): Observable<any> {
    return null;
  }
  

    


}

