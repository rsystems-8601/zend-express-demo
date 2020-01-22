import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import { map,share } from 'rxjs/operators';
import {Body, POST} from "../infra/angular2-rest";
import {RESTAuthClient} from "../infra/rest-auth-client";
import {CommonServiceDependencies} from "../infra/common-service-dependencies";
import {LocalStorage, SessionStorage} from "ngx-webstorage";
import {HttpRequest, HttpResponse} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';

import { merge as _merge, 
        chain as _chain} from "lodash";


const AUTH_SUCCESSFUL_COOKIE_NAME = "com.vmware.vdi.broker.location.id";

export const APP_TO_TEST_SSO = "testApp-PortalAdmins";


export class HorizonAuthenticationRequest {
    constructor(public applicationUrl: string,
                public username: string,
                public password: string,
                public domain: string) {
    }
}

@Injectable({
    providedIn:"root"
})
export class HorizonService extends RESTAuthClient {

    @LocalStorage("horizonCookies") private localCookies: {[appUrl: string]: string[]};
    @SessionStorage("horizonCookies") private sessionCookies: {[appUrl: string]: string[]};
    private authRequests: {[appUrl: string]: Promise<void>} = {};

    constructor(commonDependencies: CommonServiceDependencies,
                private cookieService: CookieService) {
        super(commonDependencies);
    }

    authenticate(loginRequest: HorizonAuthenticationRequest): Observable<void> {
        const request = this.horizonAuth(loginRequest)
            .pipe(
                map(cookies => this.setCookies(loginRequest.applicationUrl, cookies)),
                share()
            );
        this.authRequests[loginRequest.applicationUrl] = request.toPromise();
        return request;
    }

    authenticateWithSso(appUrl: string): Promise<void> {
        return this.getCookies(appUrl)
            ? Promise.resolve()
            : this.authRequests[appUrl] || Promise.reject("Unauthenticated");
    }

    cancelAuthenticationRequest(appUrl: string) {
        this.authRequests[appUrl] = null;
    }

    logout() {
        _chain(this.localCookies)
            .merge(this.sessionCookies)
            .flatMap(cookies => cookies)
            .map(cookie => cookie.split("=")[0])
            .uniq()
            .forEach(cookieName => this.cookieService.delete(cookieName))
            .value();
        this.cookieService.delete(AUTH_SUCCESSFUL_COOKIE_NAME);

        this.localCookies = null;
        this.sessionCookies = null;
        this.authRequests = {};
    }

    getCookies(appUrl: string): string[] {
        const cookies = this.authHolderService.isRememberMe() ? this.localCookies : this.sessionCookies;
        return cookies && cookies[appUrl];
    }

    private setCookies(appUrl: string, cookies: string[]): void {
        this.authHolderService.isRememberMe()
            ? this.localCookies = _merge(this.localCookies, {[appUrl]: cookies})
            : this.sessionCookies = _merge(this.sessionCookies, {[appUrl]: cookies});
    }

    protected responseErrorInterceptor(err: HttpResponse<any>, req: HttpRequest<any>, errorMessageKeyPrefix: string): HttpResponse<any> {
        // overriding response interceptor to avoid logging out on authentication error
        return err;
    }

    @POST("horizon-auth")
    private horizonAuth(@Body req: HorizonAuthenticationRequest): Observable<string[]> {
        return null;
    };
}

