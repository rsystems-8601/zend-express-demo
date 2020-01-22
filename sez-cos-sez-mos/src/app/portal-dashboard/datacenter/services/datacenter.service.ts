

import { Injectable } from '@angular/core';


import {GET,Path, PUT, Body, POST} from "../../../infra/angular2-rest";
import { Observable, Subject } from "rxjs";

import { CommonServiceDependencies } from "../../../infra/common-service-dependencies";
import { flatMap as _flatMap, padStart as _padStart } from "lodash";

// Custom Services and Models
import { RESTAuthClient } from "../../../infra/rest-auth-client";


@Injectable({
  providedIn: 'root'
})
export class DatacenterService extends RESTAuthClient {
  // Subscription to send data
  sharepddcData = new Subject<any>();
  reloadDatarequest = new Subject<any>();

  constructor(public commonDependencies: CommonServiceDependencies) {
    super(commonDependencies);
  }

  // Get datacenter detail

  @GET("cosmos-portal/dataCenter/find/{datacenterId}")
  getDatacenterdetails(@Path("datacenterId") datacenterId: number): Observable<any> {
      return null;
  }

  // Create Private-Ip
  @PUT("cosmos-portal/ipnetwork/create")
  createPrivateip(@Body reqPayload: any): Observable<any>  {
    return null;
  }

   // Get Public-Vlan List
   @POST("cosmos-portal/vlanpublic/findAll")
   getPublicVlanList(@Body privateipRequest: any): Observable<any> {
     return null;
   }
}






