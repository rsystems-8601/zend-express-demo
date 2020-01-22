import { BaseUrl, RESTClient } from "../infra/angular2-rest";
import { Router } from "@angular/router";
import { HttpRequest, HttpResponse, HttpHeaders } from "@angular/common/http";
import { AuthHolderService } from "../services/auth-holder.service";
import { CommonServiceDependencies } from "./common-service-dependencies";
import { ErrorService } from "../services/error.service";
import { ToastyService } from "ngx-toasty";
import { ResourceWithPermissions } from "../models/resource-with-permissions.model";
import { Page } from "../models/page.model";
import { PermissionsModel } from "../models/permissions-bearer.model";
import { isArray as _isArray } from "lodash";
import { environment } from '../../environments/environment';

const url = environment.url;
@BaseUrl(url)
export class RESTAuthClient extends RESTClient {
    authHolderService: AuthHolderService;
    router: Router;
    errorService: ErrorService;
    private toastyService: ToastyService;

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies.http);
        this.authHolderService = commonDependencies.authHolderService;
        this.router = commonDependencies.router;
        this.errorService = commonDependencies.errorService;
        this.toastyService = commonDependencies.toastyService;
    }

    protected requestInterceptor(req: HttpRequest<any>, disableScoping: boolean): HttpRequest<any> {


        if (this.authHolderService.isAuthenticated()) {
            //  req.headers.append("Authorization", `Bearer ${this.authHolderService.getJwtToken()}`);
            let headers: HttpHeaders = req.headers;
            headers = headers.append("Authorization", `Bearer ${this.authHolderService.getJwtToken()}`);
            headers = headers.append("X-Request-Type", "COSMOS")
            headers = headers.append("Accept-Language", "en-US")
            req = req.clone({
                headers: headers
            });

            return req;
        }

        return req;
    }

    protected responseInterceptor(response: HttpResponse<any>, req: HttpRequest<any>): any {
        try {
            let json = <any>response;
            console.log(json);
            if (this.isResourceWithPermissions(json)) {
                return PermissionsModel.fromResource(<ResourceWithPermissions<any>>json);
            } else if (this.isArrayOfResourcesWithPermissions(json)) {
                return PermissionsModel.fromResourceArray(<ResourceWithPermissions<any>[]>json);
            } else if (this.isPageOfResourcesWithPermissions(json)) {
                return PermissionsModel.fromResourcePage(<Page<ResourceWithPermissions<any>>>json);
            }
            return json;
        } catch (err) {
            return response;
        }
    }

    private isResourceWithPermissions(json: any): boolean {
        return json.payload !== undefined && json.editable !== undefined;
    }

    private isArrayOfResourcesWithPermissions(json: any): boolean {
        return _isArray(json) && json.length > 0 && this.isResourceWithPermissions(json[0]);
    }

    private isPageOfResourcesWithPermissions(json: any) {
        return this.isArrayOfResourcesWithPermissions(json.content);
    }

    protected responseErrorInterceptor(err: HttpResponse<any>, req: HttpRequest<any>, errorMessageKeyPrefix: string): HttpResponse<any> {
        if (err.status === 401 || err.status === 403) {
            // this.authHolderService.removeToken();
            // this.router.navigate(["/login"]);
        }
        this.showError(err, errorMessageKeyPrefix, req.url, err);
        return super.responseErrorInterceptor(err, req, errorMessageKeyPrefix);
    }

    protected showError(error, prefix?: string, reqUrl?: string, resp?: HttpResponse<any>) {
        this.errorService.getErrorMessage(error, prefix).subscribe(errorMessage => {

            let errorCaptureLink = '';
            if (resp.status !== 401 && resp.status !== 403 && resp.status !== 404) {

                this.errorService.recordErrorInSession(resp);
                let elem = document.getElementById('btnErr');
                if (elem) {
                    elem.parentNode.removeChild(elem);
                }

                /* errorCaptureLink = "<a id='btnErr' style='float:right; padding-right: 12px; color:white; text-decoration: underline; font-weight: normal;' " +
                "onClick=\"window.angularComponentRef.zone.run(function () { window.angularComponentRef.captureScreenMethod('" + reqUrl + "')})\">" +
                "Report Error" +
                "</a>"; */
            }

            if (error.error) {
                if (error.error.fieldErrors) {
                    let realMSG = '';
                    const errorMSG = error.error.fieldErrors;

                    if (error.error.fieldErrors.orderProductCannotDeleted) {
                        this.toastyService.error(errorMSG[0]);
                    } else if (error.error.fieldErrors.id) {
                        this.toastyService.error(errorMSG[0]);
                    } else if (error.error.fieldErrors.name) {
                        this.toastyService.error(error.error.fieldErrors.name);
                    }
                    
                    else {
                        // tslint:disable-next-line: forin
                        for (const x in errorMSG) {
                            realMSG = errorMSG[x];
                            break;
                        }
                        this.toastyService.error(realMSG);
                    }
                } else {
                    this.toastyService.error(errorMessage + errorCaptureLink);
                }
            } else {
                this.toastyService.error(errorMessage + errorCaptureLink);
            }
        });
    }
}
