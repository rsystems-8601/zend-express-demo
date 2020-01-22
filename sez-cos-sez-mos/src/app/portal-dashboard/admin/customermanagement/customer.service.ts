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
    QueryObject
} from "../../../infra/angular2-rest";
import {Observable,zip,Subject } from "rxjs";
import { map } from 'rxjs/operators';
import {HttpResponse } from "@angular/common/http";
// import {RESTAuthClient} from "../../infra/rest-auth-client";
import {flatMap as _flatMap, padStart as _padStart} from "lodash";
import { AddressView, countryView, stateView } from 'src/app/models/address1.model';
import { RESTAuthClient } from 'src/app/infra/rest-auth-client';
import { CommonServiceDependencies } from 'src/app/infra/common-service-dependencies';
import { Customer, Partnerparent } from 'src/app/models/customer.model';
import { Partner } from 'src/app/models/partner.model';
import { Useriew } from 'src/app/models/userview.model';
import { PageRequest } from 'src/app/models/page-request.model';
import { Pagenew } from 'src/app/models/page.model';

// Custom Services and Models

export class CustomerCreateUpdateRequest {
    constructor(public custName: string,
                public addressView?: AddressView,
                public custPhoneNo?: number,
                public custEmailId?: string,
                public address1?:string,
                public address2?:string
                ) 
    { }
}

@Injectable({providedIn:"root"})

export class CustomerService extends RESTAuthClient {


    shareDataSubject = new Subject<any>(); 

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    sendDataToOtherComponent(somedata:any){
        this.shareDataSubject.next(somedata);
    }
  
    
    @POST("cosmos-portal/customer/search")
    getCustomerList(@Body customer: any): Observable<Customer | any> {
        return null;
    }

     // All Country loads...
     @GET("cosmos-portal/common/list/country")
     getCountry(): Observable<countryView> {
        return null;
     }

    // All States loads on the basis of country Id...
    @GET("cosmos-portal/common/list/state/{countryId}")
    getState(@Path("countryId") countryId: number ): Observable<stateView> {
        return null;
    }

    // All States loads on the basis of country Id...
    @GET("cosmos-portal/common/list/city/{stateId}")
    getCity(@Path("stateId") stateId: number): Observable<stateView> {
        return null;
    }
  
     // All Partner loads...
     @GET("cosmos-portal/partner/list")
     getPartner(): Observable<Partner|any> {
        return null;
     }

     // Get load Parent Customers on the basis of partnerId...
     @GET("cosmos-portal/common/parent/customers/{partnerId}")
    getParentcustomers(@Path("partnerId") partnerId:number): Observable<Partnerparent[]> { 
        return null;
    }

    // Get load Parent Customers on the basis of partnerId...
    @GET("cosmos-portal/common/list/user/{partnerId}")
    getAsignedusers(@Path("partnerId") partnerId:number): Observable<Useriew[]> {
        return null;
 
    }
    // Customer status change
    @POST("cosmos-portal/customer/status/{customerid}/{status}")
    getChangestatus(@Path("status") status:boolean, @Path("customerid") customerid:number): Observable<any> {
        return null;
    }

    // Customer Import Triggers
    @POST("cosmos-portal/customer/import/organizations")
    getImportCustomer(): Observable<any> {
        return null;
    }

    

    @DELETE("cosmos-portal/customer/delete/{partnerId}")
    //@ErrorHandler("delete-user")
    getDeleteCustomer(@Path("customerId") customerId: number): Observable<any> {
        return null;
    }

    @GET("cosmos-portal/users/portal-admin")
    getUsersPortalAdmin(@QueryObject pageableRequest: PageRequest,
             @QueryObject userFilters: Object): Observable<Pagenew<Customer>> {
        return null;
    }

    @GET("cosmos-portal/users")
    @DisableScoping()
    getUsersWithoutScoping(@QueryObject pageableRequest: PageRequest,
                           @QueryObject userFilters: Object): Observable<Pagenew<Customer>> {
        return null;
    }

    @POST("cosmos-portal/users")
    @ErrorHandler("update-user")
    saveUser(@Body user: CustomerCreateUpdateRequest): Observable<Customer> {
        return null;
    }

    @POST("cosmos-portal/users")
    @ErrorHandler("update-user")
    batchSave(@FileUpload file: File) {
        return null;
    }

    @PUT("cosmos-portal/users/{id}")
    @ErrorHandler("update-user")
    updateUser(@Path("id") id: number, @Body user: CustomerCreateUpdateRequest): Observable<Customer> {
        return null;
    }

    @DELETE("cosmos-portal/users/{id}")
    @ErrorHandler("delete-user")
    deleteUser(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }

    @GET("cosmos-portal/users/email/uniqueness")
    checkEmailUnique(@Query("userEmail") userEmail: string): Observable<boolean> {
        return null;
    }

}

