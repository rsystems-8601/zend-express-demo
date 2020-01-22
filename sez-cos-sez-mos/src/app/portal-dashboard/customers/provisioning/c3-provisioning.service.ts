import { Injectable } from '@angular/core';
import { RESTAuthClient } from 'src/app/infra/rest-auth-client';
import { CommonServiceDependencies } from 'src/app/infra/common-service-dependencies';
import { GET,
         POST,
         Body, 
         Path,
         DELETE,
         PUT} from 'src/app/infra/angular2-rest';

import { Observable } from 'rxjs';
import { ProvisonCustomerInformation } from 'src/app/models/provisioning/provision-create-step1.model';


@Injectable()

export class C3ProvisioningService extends RESTAuthClient{
  constructor(commonDependency: CommonServiceDependencies) { 
    super(commonDependency)
  }

  // Create provisoning request Step 1
  @PUT("cosmos-portal/provisioning/contract/step1")
  createProvisionStep1(@Body step1Data: ProvisonCustomerInformation): Observable<ProvisonCustomerInformation>{
    return null
  }
  @POST('cosmos-portal/provisioning/contract/search')
  getProvisioningRequest(@Body body): Observable<any>{
    return null
  }

  @DELETE('cosmos-portal/provisioning/contract/search')
  deleteProvisioningRequest(@Path('id') id:number): Observable<any>{
    return null;
  }

  @GET('cosmos-portal/provisioning/get/roleUser/{{customerId}}')
  getProvisioninguserRole(@Path('customerId') customerId:number): Observable<any>{
    return null;
  }

  @GET('cosmos-portal/provisioning/contract/step1/{{provisonId}}')
  getStep1Detail(@Path('provisonId') provisonId: number): Observable<any>{
    return null
  }

  @GET('cosmos-portal/provisioning/common/customer/contacttype')
  getProvisoningContactType(): Observable<Array<any>>{
    return null
  }
}
