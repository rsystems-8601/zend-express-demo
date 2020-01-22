import {PermissionsModel} from "./permissions-bearer.model";

export class Role extends PermissionsModel {
    static readonly PORTAL_ADMIN = "Portal Admin";
    static readonly SUPPORT = "Support";
    static readonly PARTNER_ADMIN = "Partner Admin";
    static readonly ORGANIZATION_ADMIN = "Organization Admin";
    static readonly BUSINESS = "Business";
    static readonly USER = "User";
    static readonly PARTNER = "Partner";

    constructor(public id?: number,
                public name?: string,
                public permissions?: string[],
                public organizationTypes?: string[]) {
        super();
    }
}
