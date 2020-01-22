import {Injectable} from "@angular/core";
import {ShortUserInfo, User} from "../models/user.model";
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
} from "../infra/angular2-rest";
import {Observable,zip} from "rxjs";
import { map } from 'rxjs/operators';
import {HttpResponse} from "@angular/common/http";
import {RESTAuthClient} from "../infra/rest-auth-client";
import {PageRequest} from "../models/page-request.model";
import {Page} from "../models/page.model";
import {CommonServiceDependencies} from "../infra/common-service-dependencies";
import {FilteringService, Operator} from "./filtering.service";
import {Sort} from "../models/sort.model";
import {flatMap as _flatMap,
    padStart as _padStart} from "lodash";

export class UserCreateUpdateRequest {
    constructor(public firstName: string,
                public lastName: string,
                public organizationId: number,
                public role: string,
                public email: string,
                public mobilePhoneNumber?: string,
                public workPhoneNumber?: string) {
    }

    static from(user: User): UserCreateUpdateRequest {
        return new UserCreateUpdateRequest(
            user.firstName,
            user.lastName,
            user.organization ? user.organization.id : undefined,
            //user.roles.name,
            user.email,
            user.mobilePhoneNumber,
            user.workPhoneNumber
        );
    }
}

@Injectable(
    {
        providedIn:"root"
    }
)
export class UserService extends RESTAuthClient {

    private static readonly PORTAL_ADMIN_ID = "1";
    private static readonly DIZZION_ID = "2";
    private static readonly PADDED_PIN_LENGTH = 6;

    dizzionUserSearchFunction = (field: string, query: string): Observable<User[]> => {
        const filter = FilteringService.builder()
            .and(Operator.CONTAINS, field, query)
            .and(Operator.EQUAL, "organization", UserService.DIZZION_ID)
            .build();
        return this.getUsers(PageRequest.all(new Sort(field)), filter).pipe(map(page => page.content));
    };

    portalAdminUserSearchFunction = (field: string, query: string): Observable<User[]> => {
        const filter = FilteringService.builder()
            .and(Operator.CONTAINS, field, query)
            .and(Operator.EQUAL, "organization", UserService.PORTAL_ADMIN_ID)
            .build();
        return this.getUsersPortalAdmin(PageRequest.all(new Sort(field)), filter).pipe(map(page => page.content));
    };

    portalAdminUserByUserId = (userId: string): Observable<User[]> => {
        const filter = FilteringService.builder()
            .and(Operator.EQUAL, "id", userId)
            .build();
        return this.getUsersPortalAdmin(PageRequest.all(new Sort("id")), filter).pipe(map(page => page.content));
    };

    dizzionTeamUsersSearchFunction = (name: string) => {
        return zip(
            this.dizzionUserSearchFunction("firstName", name),
            this.dizzionUserSearchFunction("lastName", name),
            this.dizzionUserSearchFunction("email", name),
            this.portalAdminUserSearchFunction("firstName", name),
            this.portalAdminUserSearchFunction("lastName", name),
            this.portalAdminUserSearchFunction("email", name)
        ).pipe(map(users => _flatMap(users)));
    };

    userSearchFunction = (name: string): Observable<User[]> => {
        const keywords = name.trim().split(/\s+/);
        let filter;
        if (keywords.length == 1) {
            filter = FilteringService.builder()
                .or(Operator.CONTAINS, "firstName", name)
                .or(Operator.CONTAINS, "lastName", name)
                .build()
        } else {
            const [firstName, ...tail] = keywords;
            const lastName = tail.join(" ");
            filter = FilteringService.builder()
                .and(Operator.CONTAINS, "firstName", firstName)
                .and(Operator.CONTAINS, "lastName", lastName)
                .build();
        }
        return this.getUsers(PageRequest.all(new Sort("lastName")), filter).pipe(map(page => page.content))
    };

    userForOrganisationFunction(name: string, organisationId: string) {
        return zip(
            this.userForSelectedOrganisation("firstName", name, organisationId),
            this.userForSelectedOrganisation("lastName", name, organisationId)
        ).pipe(map(users => _flatMap(users)));
    }
    userForSelectedOrganisation(field: string, query: string, organisationId: string) {
        const filter = FilteringService.builder()
            .and(Operator.CONTAINS, field, query)
            .and(Operator.EQUAL, "organization", organisationId)
            .build();
        return this.getUsers(PageRequest.all(new Sort(field)), filter).pipe(map(page => page.content));
    }

    portalAdminSearchFunction = (name: string): Observable<User[]> => {
        return zip(
            this.portalAdminUserSearchFunction("firstName", name),
            this.portalAdminUserSearchFunction("lastName", name),
        ).pipe(map(users => _flatMap(users)));
    };

    userToString = (user: User | ShortUserInfo) => user ? `${user.firstName} ${user.lastName}` : "";
    usersToString = (users: User[]) => users && users.map(user => this.userToString(user)).join(", ");

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }

    getUserByEmail(email: string): Observable<User> {
        const filter = FilteringService.builder()
            .and(Operator.EQUAL, "email", email)
            .build();

        return this.getUsersWithoutScoping(PageRequest.all(), filter)
            .pipe(
            map(page => page.content),
            map(users => {
                if (users.length < 1) {
                    throw "User not found";
                }
                return users[0];
            })
            );
    };

    @GET("users")
    getUsers(@QueryObject pageableRequest: PageRequest,
             @QueryObject userFilters: Object): Observable<Page<User>> {
        return null;
    }

    @GET("users/portal-admin")
    getUsersPortalAdmin(@QueryObject pageableRequest: PageRequest,
             @QueryObject userFilters: Object): Observable<Page<User>> {
        return null;
    }

    @GET("users")
    @DisableScoping()
    getUsersWithoutScoping(@QueryObject pageableRequest: PageRequest,
                           @QueryObject userFilters: Object): Observable<Page<User>> {
        return null;
    }

    @POST("users")
    @ErrorHandler("update-user")
    saveUser(@Body user: UserCreateUpdateRequest): Observable<User> {
        return null;
    }

    @POST("users")
    @ErrorHandler("update-user")
    batchSave(@FileUpload file: File) {
        return null;
    }

    @PUT("users/{id}")
    @ErrorHandler("update-user")
    updateUser(@Path("id") id: number, @Body user: UserCreateUpdateRequest): Observable<User> {
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

    @PUT("users/{id}/send-pin")
    sendPin(@Path("id") id: number): Observable<void> {
        return null;
    }

    padPin(pin: number): string {
        return _padStart(pin ? pin.toString() : "", UserService.PADDED_PIN_LENGTH, "0");
    }
}

