import { Injectable } from "@angular/core";
import { RESTAuthClient } from "../infra/rest-auth-client";
import { HttpResponse } from "@angular/common/http";
import { Body, ErrorHandler, GET, Path, PUT } from "../infra/angular2-rest";
import { UserProfile, LoggedInUser } from "../models/user-profile.model";
import { Observable } from "rxjs";
import { CommonServiceDependencies } from "../infra/common-service-dependencies";

@Injectable({
    providedIn: "root"
})
export class UserProfileService extends RESTAuthClient {

    public userDetail: LoggedInUser;

    constructor(commonServiceDependencies: CommonServiceDependencies) {
        super(commonServiceDependencies);
    }

    @GET("user-profiles/{id}")
    getUserProfile(@Path("id") id: number): Observable<UserProfile> {
        return null;
    }

    @GET("security/user/loggedIn")
    getloggedInUserDetail(): Observable<LoggedInUser> {
        return null;
    }



    setUserDetails() {
        this.getloggedInUserDetail().subscribe(data => {
            localStorage.setItem('userDetails', JSON.stringify(data));
            if (data) {
                this.userDetail = data;
            } else {
                this.userDetail = null;
                this.router.navigate(['/login']);
            }
        })
    }

    getUserDetails() {
        if (!this.userDetail || !localStorage.getItem('userDetails') || localStorage.getItem('userDetails') === '') {
            this.setUserDetails();
        } else {
            const user = JSON.parse(localStorage.getItem('userDetails'));
            this.userDetail = user;
        }
    }

    @PUT("user-profiles/{id}")
    @ErrorHandler("update-profile")
    updateUserProfile(@Path("id") id: number, @Body user: UserUpdateProfileRequest): Observable<HttpResponse<any>> {
        return null;
    }
}

export interface UserUpdateProfileRequest {
    firstName: string;
    lastName: string;
    mobilePhoneNumber?: string;
    workPhoneNumber?: string,
    email: string;
    pin: number;
    notificationMethods: Array<string>;
    oldPassword?: string;
    newPassword?: string;
}
