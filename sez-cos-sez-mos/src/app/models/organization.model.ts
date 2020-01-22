import {PermissionsModel} from "./permissions-bearer.model";
import {ShortUserInfo, User} from "./user.model";
import {ShortEntityInfo} from "./short-entity-info.model";
import { Address } from './datacenterdetails.model';

export class Organization extends PermissionsModel {
    constructor(public id?: number,
                public organizationId?:number,
                public shortName?:string,
                public name?: string,
                public tenantTypeId?:number,
                public customerId?: string,
                public parentInfo?: ShortEntityInfo,
                public type?: string,
                public ticketing?: string,
                public supportPhoneNumber?: string,
                public customerRelationshipManager?: number,
                public serviceDeliveryManager?: number,
                public starredApplications?: ShortEntityInfo[],
                public compliant = true,
                public twoFactorAuth = true,
                public enabled = true,
                public firstName?:string,
                public lastName?:string,
                public email?:string,
                public mobilePhoneNumber?:string,
                public workPhoneNumber?:string,
                public address?:Address,
                public parentId?:number,
                public partnerId?:number,
                public cid?:number) {
                super();
    }
}

export class ShortOrganizationInfo {
    public id;
    public customerId;
    public name;

    static from(organization: Organization): ShortOrganizationInfo {
        return {
            id: organization.id,
            customerId: organization.customerId,
            name: organization.name,
        }
    }
}

export interface SupportContacts {
    supportPhoneNumber: string;
    customerRelationshipManager: ShortUserInfo;
    serviceDeliveryManager: ShortUserInfo;
}

export enum OrganizationType {
    PORTAL_ADMIN,
    DIZZION,
    PARTNER,
    CUSTOMER
}
