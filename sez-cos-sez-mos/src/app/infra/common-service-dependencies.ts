import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {AuthHolderService} from "../services/auth-holder.service";
import {HttpClient} from "@angular/common/http";
import {ErrorService} from "../services/error.service";
import {ToastyService} from "ngx-toasty";

@Injectable({
    providedIn:"root"
})
export class CommonServiceDependencies {

    constructor(public http: HttpClient,
                public authHolderService: AuthHolderService,
                public router: Router,
                public errorService: ErrorService,
                public toastyService: ToastyService) {
    }
}