import {RESTAuthClient} from "../infra/rest-auth-client";
import {Injectable} from "@angular/core";
import {
    Body,
    DELETE,
    DisableScoping,
    ErrorHandler,
    GET,
    Path,
    POST,
    PUT,
    Query,
    QueryObject
} from "../infra/angular2-rest";
import {PageRequest} from "../models/page-request.model";
import {Observable} from "rxjs";
import { map, flatMap,take} from 'rxjs/operators';
import {Page} from "../models/page.model";
import {HttpResponse} from "@angular/common/http";
import {CommonServiceDependencies} from "../infra/common-service-dependencies";
import {Role} from "../models/role.model";
import * as _ from "lodash";
import {TranslateService} from "@ngx-translate/core";
import { keyframes } from "@angular/animations";

export class RoleCreateUpdateRequest {
    constructor(public name: string,
                public permissions: string[],
                public organizationTypes: string[]) {
    }
}

@Injectable({
    providedIn:"root"
})
export class RoleService extends RESTAuthClient {
    roleComparator = (r1: Role, r2: Role) => r1.id === r2.id;

    // searchTranslatedPermissions = (keyword: string) => this.getPermissions()
    //     .pipe(
    //      flatMap(permissions => this.translateService.get(permissions)),
    //      map(translations => _(translations)),
    //      map( translation => (_.pickBy((translation) => _.includes(translation.toLowerCase(), keyword.toLowerCase())))),
    //      map(key => _(key).keys()),
    //      map(val => _(val).values())
    //      );

    searchTranslatedPermissions = (keyword: string) => this.getPermissions()
        .pipe(flatMap(permissions => this.translateService.get(permissions)))
         .pipe(map(translations =>{
           return _(translations)
           .pickBy((translation) => _.includes(translation.toLowerCase(), keyword.toLowerCase()))
            .keys()
            .value()
         }));
    constructor(commonDependencies: CommonServiceDependencies,
                private translateService: TranslateService) {
        super(commonDependencies);
    }

    @GET("control-center/roles")
    getRoles(@QueryObject pageRequest: PageRequest,
             @QueryObject filters: Object): Observable<Page<Role>> {
        return null;
    };

    @GET("control-center/permissions")
    getPermissions(): Observable<string[]> {
        return null;
    };

    @GET("control-center/subordinate-roles")
    getSubordinateRoles(): Observable<Role[]> {
        return null;
    }

    @GET("control-center/organization-type/{type}/roles")
    getRolesAvailableForOrganizationType(@Path("type") name: string): Observable<Role[]> {
        return null;
    }

    @GET("control-center/organization-type/{type}/roles")
    @DisableScoping()
    getRolesAvailableForOrganizationTypeWithoutScoping(@Path("type") name: string): Observable<Role[]> {
        return null;
    }

    @GET("control-center/roles/name/uniqueness")
    checkNameUnique(@Query("roleName") roleName: string): Observable<boolean> {
        return null;
    }

    @POST("control-center/roles")
    saveRole(@Body role: RoleCreateUpdateRequest): Observable<Role> {
        return null;
    }

    @PUT("control-center/roles/{id}")
    updateRole(@Path("id") id: number, @Body role: RoleCreateUpdateRequest): Observable<Role> {
        return null;
    }

    @DELETE("control-center/roles/{id}")
    @ErrorHandler("delete-role")
    deleteRole(@Path("id") id: number): Observable<HttpResponse<any>> {
        return null;
    }
    @POST("security/role/search/filter")
    getRolesc3(@Body filters: Object): Observable<any> {
        return null;
    };

    roleSearchFunction = (name: string) => {
        var orFilter: {}
        if (name)
            orFilter = {"name": name}
            let filter = {orfilter: orFilter, andfilter: {},ascSorting: [],descSorting: [],pageNo: 1,recordsPerPage: 10000}
        return  this.getRolesc3(filter)
            .pipe(map(page => page.data))

    }
     roleToString = (role: any) => role ? `${role.name}` : "";
}

