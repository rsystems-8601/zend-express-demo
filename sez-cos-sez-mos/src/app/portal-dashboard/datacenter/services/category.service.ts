import { Category } from 'src/app/models/category.model';
import { Injectable } from '@angular/core';
import { PodManagement } from '../../../models/pod-model/pod-management.model';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

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
    QueryObject,
    Header,
    ResponseType
} from "../../../infra/angular2-rest";
import {Observable, Subject} from "rxjs";

import {CommonServiceDependencies} from "../../../infra/common-service-dependencies";
import {flatMap as _flatMap, padStart as _padStart} from "lodash";

import { RESTAuthClient } from "../../../infra/rest-auth-client"

// Custom Services and Models




export class CategoryCreateUpdateRequest {
    constructor(public categoryName: string,
                public categoryDefinition?: string,
                )
    { }
}

@Injectable({providedIn:"root"})

export class CategoryService extends  RESTAuthClient {

    categortyChanged: Subject<boolean> = new Subject();

    constructor(commonDependencies: CommonServiceDependencies) {
        super(commonDependencies);
    }


    /* @POST("cosmos-portal/category/search")
    getCategoryList(@Body category: any): Observable<Category | any> {
        return null;
    } */

    @POST("cosmos-portal/category/search")
    getCategoryList(@Body category: any): Observable<Category | any> {
        return null;
    }

    @POST("cosmos-portal/category/create")
    saveCategory(@Body category: Category): Observable<Category|any> {
        return null;
    }

    @PUT("cosmos-portal/category/update")
    updateCategory(@Body category: Category): Observable<Category|any> {
        return null;
    }

    @DELETE("cosmos-portal/category/delete/{categoryId}")
    //@ErrorHandler("delete-user")
    getDeleteCategory(@Path("categoryId") categoryId: number, @Body body: any): Observable<any> {
        return null;
    }


}

