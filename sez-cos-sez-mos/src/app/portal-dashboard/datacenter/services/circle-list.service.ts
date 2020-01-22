import {Injectable} from "@angular/core";
import {
    GET,
    Path
    
} from "../../../infra/angular2-rest";
import {Observable,zip} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {RESTAuthClient} from "../../../infra/rest-auth-client";
import {CommonServiceDependencies} from "../../../infra/common-service-dependencies";


@Injectable(
    {
        providedIn:"root"
    }
)
export class CircleListServcie extends RESTAuthClient {

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }


    

    @GET("cosmos-portal/common/list/datacenterC3")
    getDatacenterList(): Observable<HttpResponse<any>> {
        return null;
    }

    @GET("cosmos-portal/common/list/c3Datacenter/{id}/c3pods")
    getDatcenterPOD(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }

    @GET("cosmos-portal/common/list/getCustomersC3/{podId}")
    getPodCustomer(@Path("podId") podId: number): Observable<HttpResponse<any>> {
        return null;
    }

    @GET("cosmos-portal/common/list/getPrivateCloudC3/{customerId}")
    getCustomerPrivatCloud(@Path("customerId") customerId: number): Observable<HttpResponse<any>> {
        return null;
    }

    @GET("cosmos-portal/common/list/c3desktoppools/{privateCloudId}")
    getDesktopPool(@Path("privateCloudId") privateCloudId: number): Observable<HttpResponse<any>> {
        return null;
    }

    @GET("cosmos-portal/common/list/c3Desktopuser/{deskTopPoolId}")
    getDesktopPoolUsers(@Path("deskTopPoolId") deskTopPoolId: number): Observable<HttpResponse<any>> {
        return null;
    }

}

