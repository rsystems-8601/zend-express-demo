import {Injectable} from "@angular/core";
import {Observable } from "rxjs";

import {flatMap as _flatMap, padStart as _padStart} from "lodash";
import { Address } from 'cluster';
import { RESTAuthClient } from '../../../infra/rest-auth-client';
import { CommonServiceDependencies } from '../../../infra/common-service-dependencies';
import { POST, Body, GET, Path, DELETE, PUT, ErrorHandler } from '../../../infra/angular2-rest';
import { Partner } from 'src/app/models/partner.model';
import { countryView, stateView } from '../../../models/address1.model';


// Services and Models for 


export class PartnerCreateUpdateRequest {
    constructor(public partnerName: string,
                public address?: Address,
                public phoneNumber?: number,
                public email?: string,
                public address1?:string,
                public address2?:string,
                public cityName?:string,
                public countryId?:string,
                public zipCode?:string,
                public stateId?:string,
                public city?:string | any,
                public partnerId?: number
                ) {
    }

}

@Injectable({providedIn:"root"})

export class PartnerService extends RESTAuthClient {
    
    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }


    @POST("cosmos-portal/partner/search/filter")
    getPartnrList(@Body partner)  : Observable<Partner | any> {
        return null;
     }

    // Get All Country
    @GET('cosmos-portal/common/list/country')
    getCountry(): Observable<countryView> { 
        return null;
    }

    // All States loads on the basis of country Id...
    @GET('common/list/state/{countryId}')
    getState(@Path("countryId") countryId: number): Observable<stateView> {
        return null;
    }


    @DELETE("cosmos-portal/partner/delete/{partnerId}")
    @ErrorHandler("partner/deleter")
    getDeleteCustomer(@Path("partnerId") partnerId: number): Observable<any> {
        return null;
    }

    // Update User
    @POST("cosmos-portal/partner/update")
    @ErrorHandler("update-partner")
    updatePartner( @Body partner: PartnerCreateUpdateRequest): Observable<Partner> {
        return null;
    }
    // Save User
    @PUT("cosmos-portal/partner/create")
    @ErrorHandler("partner/create")
    savePartner(@Body user: PartnerCreateUpdateRequest): Observable<Partner> {
        return null;
    }

}

