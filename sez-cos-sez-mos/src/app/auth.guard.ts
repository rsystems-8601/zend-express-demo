import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthHolderService} from "./services/auth-holder.service";
import {Injectable} from "@angular/core";
import { PermissionService } from './services/permission.service';
import { HorizonService } from './services/horizon.service';

@Injectable(
    {
        providedIn:"root"
    }
)
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private authHolderService: AuthHolderService,
                private permissionService: PermissionService,
                private horizonService: HorizonService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authHolderService.isAuthenticated()) {
            this.authHolderService.removeToken();
            this.horizonService.logout();
            this.router.navigate(["/login"]);
            this.authHolderService.initiallyRequestedUrl = state.url;
            return false;
        } else if (!this.permissionService.hasAccess(state.url)) {
            this.router.navigate(["/"]);
            return false;
        }
        return true;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }
}