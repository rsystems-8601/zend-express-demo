import { RESTAuthClient } from "../infra/rest-auth-client";
import { BaseUrl } from "../infra/angular2-rest";
import { HttpRequest, HttpHeaders } from "@angular/common/http";
@BaseUrl('http://cosmos-staging.dizzion.com/portal/')
export class RESTAuthCosmosClient extends RESTAuthClient {

    protected requestInterceptor(req: HttpRequest<any>, disableScoping: boolean): HttpRequest<any> {
        if (this.authHolderService.isAuthenticated()) {
           let headers = req.headers;
           headers = headers.append('X-Language','en-US');
           headers = headers.append('X-Access-Token', '02-46-98-FA-6A-89832566F3-BBBA-4DD6-8117-37FAED0EB2E6');  
            req = req.clone({
                 headers : headers
             })
             return req;
        }
        return req;
    }
}
