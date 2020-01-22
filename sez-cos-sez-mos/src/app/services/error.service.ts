import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {SessionStorage} from "ngx-webstorage";
import {HttpResponse} from "@angular/common/http";
// import { RESTAuthClient } from "../infra/rest-auth-client";
// import { CommonServiceDependencies } from "../infra/common-service-dependencies";
// import {
//     Body,
//     DELETE,
//     DisableScoping,
//     ErrorHandler,
//     GET,
//     Path,
//     POST,
//     PUT,
//     Query,
//     QueryObject
// } from "../infra/angular2-rest";
import { flatMap } from "rxjs/operators";

@Injectable({
    providedIn:"root"
})
export class ErrorService {

    @SessionStorage("errorLog") private sessionStorageErrorLog;

    constructor(private translateService: TranslateService) {
    }

    getErrorMessage(error, prefix?: string): Observable<string> {
        let defaultErrorMessageKey = `errors.http.${error.status}`;
        if (prefix === undefined) {
            return this.getDefaultErrorMessage(defaultErrorMessageKey);
        } else {
            let errorMessageKey = `${prefix}.errors.http.${error.status}`;
            let businessExceptionCode = this.extractBusinessExceptionCode(error);
            if (businessExceptionCode) {
                errorMessageKey += `.${businessExceptionCode}`;
            }
            return this.translateService.get(errorMessageKey)
                .pipe(
                    flatMap((value: string) => value === errorMessageKey ? this.getDefaultErrorMessage(defaultErrorMessageKey) : of(value))
                );
        }
    }

    recordErrorInSession(response: HttpResponse<any>) {
        this.sessionStorageErrorLog = response;
        setTimeout(() => { this.sessionStorageErrorLog = null; }, 10000);
    }

    getErrorInSession(): HttpResponse<any> {
        return this.sessionStorageErrorLog;
    }

    private getDefaultErrorMessage(errorMessageKey: string): Observable<string> {
        return this.translateService.get(errorMessageKey)
            .pipe(
                flatMap((value: string) => value === errorMessageKey ?
                         this.translateService.get(`errors.http.500`): 
                         of(value)));
    }

    private extractBusinessExceptionCode(error) {
        try {
            return error.json().businessExceptionCode;
        } catch (err) {
        }
    }
}