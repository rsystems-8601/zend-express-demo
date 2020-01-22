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
import { stateView } from '../../../models/address.model';
import { HVVr } from 'src/app/models/podslist.model';


export class CustomerAssignmentCreateUpdateRequest {
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

export class CustomerAssignmentService extends RESTAuthClient {


    shareDataSubject = new Subject<any>();
    reloadDatarequest = new Subject<any>();

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

    

    
    @POST("customerAssignment/saveCustomerAssignment")
    saveCustomerAsignment(@Body customerasignment: any): Observable<CustomerAssignment | any> {
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

    // All States loads on the basis of country Id...
    @GET("common/list/city/{stateId}")
    getCity(@Path("stateId") stateId: number): Observable<stateView> {
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
    
    @DELETE("cosmos-portal/customerAssignment/deleteCustomerAssignment/{customerId}")
    //@ErrorHandler("delete-user")
    getDeleteCustomer(@Path("customerId") customerId: number): Observable<any> {
        return null;
    }

   
    @POST("users")
    @ErrorHandler("update-user")
    saveUser(@Body user: CustomerAssignmentCreateUpdateRequest): Observable<CustomerAssignment> {
        return null;
    }

    @POST("users")
    @ErrorHandler("update-user")
    batchSave(@FileUpload file: File) {
        return null;
    }

    getReloaddata(reloadValue:boolean) {
        this.reloadDatarequest.next(reloadValue);
     }

    @PUT("users/{id}")
    @ErrorHandler("update-user")
    updateUser(@Path("id") id: number, @Body user: CustomerAssignmentCreateUpdateRequest): Observable<CustomerAssignment> {
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

