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
import {Observable,zip, of, from, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import {HttpResponse, HttpClient, HttpHeaders} from "@angular/common/http";
// import {RESTAuthClient} from "../../infra/rest-auth-client";
import {flatMap as _flatMap, padStart as _padStart} from "lodash";
import { RESTAuthClient } from 'src/app/infra/rest-auth-client';
import { CommonServiceDependencies } from 'src/app/infra/common-service-dependencies';
import { EmailTemplate, EmailTemplatedetails } from 'src/app/models/emailtemplate.model';
import { PageRequest } from 'src/app/models/page-request.model';
import { Pagenew } from 'src/app/models/page.model';

// Custom Services and Models



export class CategoryCreateUpdateRequest {
    constructor(public name: string
                ) 
    { }
}

@Injectable({providedIn:"root"})

export class EmailtemplateService extends RESTAuthClient {



    constructor(commonDependencies: CommonServiceDependencies, private _http: HttpClient) {
        super(commonDependencies);
    }

  
    @GET("cosmos-portal/emailTemplate/list")
    getEmailtemplatelist(): Observable<EmailTemplate> {
       return null;
    }


    @GET("cosmos-portal/emailTemplate/find/{emailTemplateid}")
    getEmailtemplatebody(@Path("emailTemplateid") emailTemplateid: number ): Observable<EmailTemplatedetails> {
        return null;
    }


    @GET("users/portal-admin")
    getUsersPortalAdmin(@QueryObject pageableRequest: PageRequest,
             @QueryObject userFilters: Object): Observable<Pagenew<EmailTemplate>> {
        return null;
    }

    @GET("users")
    @DisableScoping()
    getUsersWithoutScoping(@QueryObject pageableRequest: PageRequest,
                           @QueryObject userFilters: Object): Observable<Pagenew<EmailTemplate>> {
        return null;
    }

    @POST("users")
    @ErrorHandler("update-user")
    saveUser(@Body user: CategoryCreateUpdateRequest): Observable<EmailTemplate> {
        return null;
    }

    @POST("users")
    @ErrorHandler("update-user")
    batchSave(@FileUpload file: File) {
        return null;
    }

    @PUT("users/{id}")
    @ErrorHandler("update-user")
    updateUser(@Path("id") id: number, @Body user: CategoryCreateUpdateRequest): Observable<EmailTemplate> {
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

