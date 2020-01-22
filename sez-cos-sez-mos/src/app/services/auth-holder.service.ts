import {Injectable} from "@angular/core";
import {includes as _includes} from "lodash";
import {OrganizationType} from "../models/organization.model";
import {LocalStorage, SessionStorage} from "ngx-webstorage";
import {Permission} from "../models/permission.model";
import {Role} from "../models/role.model";

@Injectable({
    providedIn:"root"
})
export class AuthHolderService {

    @LocalStorage("authToken") private localStorageToken;
    @SessionStorage("authToken") private sessionStorageToken;

    initiallyRequestedUrl: string;

    getJwtToken(): string {
        return this.localStorageToken || this.sessionStorageToken;
    }

    setJwtToken(token: string, rememberMe = this.isRememberMe()): void {
        if (rememberMe) {
            this.localStorageToken = token;
        } else {
            this.sessionStorageToken = token;
        }
    }

    isScopeEnabled(): boolean {
        return !!(this.extractUserFromToken(this.getJwtToken()).scope);
    }

    isAuthenticated(): boolean {
        const token = this.getJwtToken();
        return token && !this.hasExpired(token);
    }

    isRememberMe(): boolean {
        return !!this.localStorageToken;
    }

    private hasExpired(token: string): boolean {
        return false;
        return !(this.getTokenExpirationDate(token).valueOf() > new Date().valueOf());
    }

    private getTokenExpirationDate(token: string): Date {
        const exp = this.extractUserFromToken(token).exp;
        const date = new Date(0);
        if (exp === undefined) {
            return date;
        }

        date.setUTCSeconds(exp);
        return date;
    }

    removeToken(): void {
        this.localStorageToken = null;
        this.sessionStorageToken = null;
    }

    getAuthentication(): Authentication {
        const rootAuth = this.extractUserFromToken(this.getJwtToken());
        return rootAuth.scope || rootAuth;
    }

    isMemberOfDizzionTeams(): boolean {
        return this.getAuthentication().memberOfDizzionTeams;
    }

    hasPermission(permission: Permission): boolean {
        return _includes(this.getAuthentication().permissions, Permission[permission]);
    }

    getOrganizationType(): OrganizationType {
        return this.getAuthentication() && OrganizationType[this.getAuthentication().organizationType];
    }

    getRole(): string {
        return this.getAuthentication() && this.getAuthentication().role;
    }

    hasRole(role: string): boolean {
        return this.getAuthentication() && this.getAuthentication().role === role;
    }

    isOrganizationAdmin(): boolean {
        return false;
        return this.getAuthentication() && this.getAuthentication().role === Role.ORGANIZATION_ADMIN;
    }

    isUserRole(): boolean {
        return this.getAuthentication && this.getAuthentication().role === Role.USER;
    }

    isPortalAdmin(): boolean {
        return this.getAuthentication() && OrganizationType[this.getAuthentication().organizationType] === OrganizationType.PORTAL_ADMIN;
    }

    isCompliantUser(): boolean {
        return this.getAuthentication().compliant;
    }

    private extractUserFromToken(token: string): Authentication {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload));
    }
}

export interface Authentication {
    sub: number;
    exp: number;
    role: string;
    permissions: string[];
    email: string;
    availableOrgTypes: string[];
    organizationType: string;
    organizationId: number;
    organizationCid: string;
    organizationName: string;
    scope: Authentication;
    memberOfDizzionTeams: boolean;
    twoFactorAuth: boolean;
    compliant: boolean;
}