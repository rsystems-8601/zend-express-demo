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
} from "../../../infra/angular2-rest";

import {Observable, Subject} from "rxjs";

import {HttpResponse } from "@angular/common/http";
// import {RESTAuthClient} from "../../infra/rest-auth-client";

import {CommonServiceDependencies} from "../../../infra/common-service-dependencies";
import {flatMap as _flatMap, padStart as _padStart} from "lodash";
import { RESTAuthClient } from 'src/app/infra/rest-auth-client';
import { CustomerAssignment } from 'src/app/models/customerassignment.model';
import { Datacenter, Pods } from 'src/app/models/cos-common.model';
import { Applience } from '../../../models/applience.model';
import { HVVr } from 'src/app/models/podslist.model';

// Custom Services and Models


export class AppliancesCreateUpdateRequest {
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

export class AppliancesService extends RESTAuthClient {


    shareDataSubject = new Subject<any>();

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    sendDataToOtherComponent(somedata:any){
        this.shareDataSubject.next(somedata);
    }
  
    
    @POST("cosmos-portal/customerAssignment/search")
    getCustomerAsignmentList(@Body customerasignment: any): Observable<CustomerAssignment | any> {
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
    

     // Job restarted
     @GET("cosmos-portal/agentConfiguration/defaultValueForAppliance")
     getjobVaradd(): Observable<any> {
         return null;
     }

    
    @POST("cosmos-portal/agentConfiguration/saveAppliance")
    saveApplience(@Body appliencedata: any): Observable<Applience> {
        return null;
    }
     // All Product loads...
     @GET("provisioning/common/newOrder/productList")
     getProduct(): Observable<any> {
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

  
    

     // Get load Parent Customers on the basis of partnerId...
     @GET("common/parent/customers/{partnerId}")
    getParentcustomers(@Path("partnerId") partnerId:number): Observable<CustomerAssignment[]> { 
        return null;
    }


    @GET("common/list/pods/{datacenterId}")
    getPodlist(@Path("datacenterId") datacenterId:number): Observable<any[]> { 
        return null;
    }

    @GET("customerAssignment/getPodChildren/{podId}")
    getPodChildrens(@Path("podId") podId:number): Observable<HVVr> { 
        return null;
    }

  
    // Customer status change

    @POST("customer/status/{customerid}/{status}")
    getChangestatus(@Path("status") status:boolean, @Path("customerid") customerid:number): Observable<any> {
        return null;
    }


    @POST("customer/search/name")
    searchCustomer(@Body custName: any): Observable<any> {
        return null;
    }

    // Customer Import Triggers
    @POST("customer/import/organizations")
    getImportCustomer(): Observable<any> {
        return null;
    }

    @POST("customerAssignment/getAvailablePublicIps")
    getPublicIPs(@Body data): Observable<any>{
        return null
    }
    @POST("customerAssignment/getAvailablePrivateIps")
    getPrivateIPs(@Body data): Observable<any>{
        return null
    }
    
    @DELETE("customerAssignment/deleteCustomerAssignment/{customerId}")
    //@ErrorHandler("delete-user")
    getDeleteCustomer(@Path("customerId") customerId: number): Observable<any> {
        return null;
    }

   
  

    @POST("users")
    @ErrorHandler("update-user")
    batchSave(@FileUpload file: File) {
        return null;
    }

   

    @DELETE("users/{id}")
    @ErrorHandler("delete-user")
    deleteUser(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }

    @GET("users/email/uniqueness")
    checkEmailUnique(@Query("userEmail") userEmail: string): Observable<boolean> {
        return null;
    }

}

