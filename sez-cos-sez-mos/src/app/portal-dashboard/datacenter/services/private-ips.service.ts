import { Injectable } from '@angular/core';



import {
  Body,
  DELETE,
  GET,
  Path,
  POST,
  PUT
} from "../../../infra/angular2-rest";
import { Observable, Subject } from "rxjs";

import { CommonServiceDependencies } from "../../../infra/common-service-dependencies";
import { flatMap as _flatMap, padStart as _padStart } from "lodash";

// Custom Services and Models
import { RESTAuthClient } from "../../../infra/rest-auth-client";
import { NetworkIps } from "../models/private-ips.model";


@Injectable({
  providedIn: 'root'
})
export class PrivateIpsService extends RESTAuthClient {
  // Subscription to send data
  sharepddcData = new Subject<any>();
  reloadDatarequest = new Subject<any>();

  reloadAlocateIp = new Subject<any>();

  reloadDeAlocateIp = new Subject<any>();

  constructor(public commonDependencies: CommonServiceDependencies) {
    super(commonDependencies);
  }

  sendDataPod(somedata: any) {
    this.sharepddcData.next(somedata);
  }

  sendAlocatedIpdata(ipData:any) {
    this.reloadAlocateIp.next(ipData);
  }

  sendDeAlocatedIpdata(ipData:any) {
    this.reloadDeAlocateIp.next(ipData);
  }

  getReloaddata(reloadValue: boolean) {
    this.reloadDatarequest.next(reloadValue);
  }

  // Get private-Ips List
  @POST("cosmos-portal/ipnetwork/search")
  getprivateIpsList(@Body privateipRequest: any): Observable<any> {
    return null;
  }

  // Delete Private-Ip
  @DELETE("cosmos-portal/ipnetwork/delete/{ipId}")
  deletePrivateip(@Path("ipId") ipId: number): Observable<any> {
    return null;
  }

  // Edit Private-Ip Details
  @GET("cosmos-portal/ipnetwork/detail/{ipId}")
  getprivateIpDetails(@Path("ipId") ipId: number): Observable<any> {
    return null;
  }

  // Get Public-Vlan List
  @POST("cosmos-portal/vlanpublic/findAll")
  getPublicVlanList(@Body privateipRequest: any): Observable<any> {
    return null;
  }

  // Get Network Details
  @GET("cosmos-portal/ipnetwork/networkByGivenRange/{ipId}?takenFrom=0&taken=200&isPublic={isPublic}")
  getprivateIpNetworkDetails(@Path("ipId") ipId: number, @Path("isPublic") isPublic: boolean): Observable<any> {
    return null;
  }

  // Update Private-Ip
  @POST("cosmos-portal/ipnetwork/update")
  updatePrivateip(@Body privateipRequest: any): Observable<any> {
    return null;
  }

  // Reserve Private-Ip
  @PUT("cosmos-portal/ipnetwork/reservePublicIp/{id}/false")
  reservePrivateip(@Path("id") id: number, @Body reqPayload: any): Observable<any>  {
    return null;
  }

  // Unreserve Private-Ip
  @PUT("cosmos-portal/ipnetwork/reservePublicIp/{id}/true")
  unreservePrivateip(@Path("id") id: number, @Body reqPayload: any): Observable<any> {
    return null;
  }

  // Allocate Private-Ip
  @PUT("cosmos-portal/ipnetwork/allocateIpToCustomer")
  allocatePrivateip(@Body reqPayload: any): Observable<any>  {
    return null;
  }

  // Deallocate Private-Ip
  @PUT("cosmos-portal/ipnetwork/deAllocatePublicIP/{id}")
  deallocatePrivateip(@Path("id") id: number, @Body reqPayload: any): Observable<any>  {
    return null;
  }

  // Create Private-Ip
  @PUT("cosmos-portal/ipnetwork/create")
  createPrivateip(@Body reqPayload: any): Observable<any>  {
    return null;
  }

  // Search Customer
  @POST("cosmos-portal/customer/search/name")
  searchCustomer(@Body custName: any): Observable<any> {
    return null;
  }
  
}
