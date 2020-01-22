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
import { CustomerAssignment } from 'src/app/models/customerassignment.model';
import { Datacenter, Pods } from 'src/app/models/cos-common.model';
import { HVVr } from 'src/app/models/podslist.model';
import { Hardware, CpuType, OwnerType } from 'src/app/models/hardware.model';

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

export class HardwareService extends RESTAuthClient {


    shareDataSubject = new Subject<any>();

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    sendDataToOtherComponent(somedata:any){
        this.shareDataSubject.next(somedata);
    }
  
    
    @GET("cosmos-portal/common/list/cpuTypes")
    getCpuType(): Observable<CpuType> {
        return null;
    }

    @GET("cosmos-portal/common/list/owners")
    getOwnerType(): Observable<OwnerType> {
        return null;
    }

    @GET("cosmos-portal/pods/hardware/switch/types")
    getSwitchType(): Observable<any> {
        return null;
    }

    @GET("cosmos-portal/pods/hardware/types")
    getHardwareType(): Observable<any> {
        return null;
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

 

    @POST("cosmos-portal/pods/hardware/search")
    getHardwaredataTypeAndPodid(@Body hardwareData: any): Observable<any> {
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
    

    
    @PUT("cosmos-portal/pods/hardware/create")
    saveHardware(@Body hardwareData: any): Observable<Hardware> {
        return null;
    }

    @PUT("cosmos-portal/pods/hardware/update")
    updateHardware(@Body hardwareData: any): Observable<Hardware> {
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

  

    @GET("common/list/pods/{datacenterId}")
    getPodlist(@Path("datacenterId") datacenterId:number): Observable<any[]> { 
        return null;
    }

    

    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
    
      }

}

