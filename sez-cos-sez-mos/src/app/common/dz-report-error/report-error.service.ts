import {Injectable} from "@angular/core";
import { RESTAuthClient } from 'src/app/infra/rest-auth-client';
import { CommonServiceDependencies } from 'src/app/infra/common-service-dependencies';
import { POST, SkipErrorHandler, Body } from 'src/app/infra/angular2-rest';
import { ReportErrorCreateRequest } from 'src/app/models/user.model';
import { Observable } from 'rxjs';


@Injectable({
    providedIn:"root"
})
export class ReportErrorService extends RESTAuthClient {

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    @POST("reporterror")
    @SkipErrorHandler(400)
    reportError(@Body reportError: ReportErrorCreateRequest): Observable<any> {
        return null;
    }

}


