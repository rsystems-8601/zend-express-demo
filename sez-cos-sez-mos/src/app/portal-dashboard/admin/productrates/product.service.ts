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
import {Observable } from "rxjs";
import {HttpResponse, HttpClient } from "@angular/common/http";
import {PageRequest} from "../../../models/page-request.model";
import { Pagenew} from "../../../models/page.model";
import {CommonServiceDependencies} from "../../../infra/common-service-dependencies";
import {flatMap as _flatMap, padStart as _padStart} from "lodash";

// Custom Services and Models
import { Product, Productcategoryview, Automationblueprint } from "../../../models/product.model";
import { RESTAuthClient } from 'src/app/infra/rest-auth-client';



export class ProductsCreateUpdateRequest {
    constructor(public productName: string,
                public productDescription?: string,
                )
    { }
}

@Injectable({providedIn:"root"})

export class ProductService extends RESTAuthClient {


    constructor(commonDependencies: CommonServiceDependencies, private _http: HttpClient) {
        super(commonDependencies);
    }


    @POST("cosmos-portal/product/search")
    getProductList(@Body product: any): Observable<Product | any> {
        return null;
    }

    @POST("cosmos-portal/product/update")
    updateProduct(@Body product: any): Observable<Product | any> {
        return null;
    }

    @PUT("cosmos-portal/product/create")
    createProduct(@Body product: any): Observable<Product | any> {
        return null;
    }

    @GET("cosmos-portal/product/allCategory")
    getCategory(): Observable<Productcategoryview> {
       return null;
    }

    @GET("cosmos-portal/automationblueprint/getblueprints")
    getAutomationblueprint(): Observable<Automationblueprint> {
       return null;
    }

    @DELETE("cosmos-portal/product/delete/{productId}")
    //@ErrorHandler("delete-user")
    getDeleteProduct(@Path("productId") productId: number): Observable<any> {
        return null;
    }

    @GET("cosmos-portal/users/portal-admin")
    getUsersPortalAdmin(@QueryObject pageableRequest: PageRequest,
             @QueryObject userFilters: Object): Observable<Pagenew<Product>> {
        return null;
    }


}

