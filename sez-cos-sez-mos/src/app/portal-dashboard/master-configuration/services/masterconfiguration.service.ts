import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { flatMap as _flatMap, padStart as _padStart } from "lodash";

// Custom Services and Models
import {
  Body,
  DELETE,
  GET,
  Path,
  POST,
  PUT
} from "../../../infra/angular2-rest";
import { CommonServiceDependencies } from "../../../infra/common-service-dependencies";
import { RESTAuthClient } from "../../../infra/rest-auth-client";
import { MasterConfiguration } from "../../../models/masterconfiguration.model";


@Injectable({
  providedIn: 'root'
})

export class MasterconfigurationService extends RESTAuthClient {

  constructor(public commonDependencies: CommonServiceDependencies) {
    super(commonDependencies);
  }

  // Get Master Configuration
  @GET("cosmos-portal/masterConfiguration/get/1")
  getMasterconfiguration(): Observable<MasterConfiguration> {
      return null;
  }

  // Crate-Update Master Configuration
  @POST("cosmos-portal/masterConfiguration/createUpdate")
  createUpdate(@Body data: any): Observable<any> {
      return null;
  }
}
