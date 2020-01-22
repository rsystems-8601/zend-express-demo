import {Injectable} from "@angular/core";
import {RESTAuthClient} from "../infra/rest-auth-client";
import {Body, ErrorHandler, POST, SkipErrorHandler, GET} from "../infra/angular2-rest";
import {Observable} from "rxjs";
import {CommonServiceDependencies} from "../infra/common-service-dependencies";
import {HttpResponse} from "@angular/common/http";

export class AuthCredentials {
    constructor(public email: string, public password: string, public twoFactorAuthToken?: number) {
    }
}

export class EmailAndPassword {
    constructor(public email: string, public password: string) {
    }
}

export class UserNameAndPassword {
    constructor(public username: string, public password: string) {
    }
}

export interface TokenResponse {
    token: string;
}

@Injectable({
    providedIn:"root"
})
export class AuthService extends RESTAuthClient {

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    @POST("token")
    @ErrorHandler("login")
    login(@Body req: AuthCredentials): Observable<TokenResponse> {
        return null;
    };
    
    @POST("security/auth/signin")
    @ErrorHandler("login")
    userLogin(@Body req: UserNameAndPassword): Observable<TokenResponse> {
        return null;
    };

    @POST("two-factor-auth-type")
    @ErrorHandler("login")
    getTwoFactorAuthType(@Body req: EmailAndPassword): Observable<string> {
        return null;
    };

    

    @GET("cosmos-portal/role/list")
    getRole(): Observable<TokenResponse> {
        return null;
    }

    @POST("two-factor-auth-token")
    @SkipErrorHandler(400)
    requestSmsToken(@Body req: EmailAndPassword): Observable<HttpResponse<any>> {
        return null;
    };
}

