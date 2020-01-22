import {Organization} from "./organization.model";
import {PermissionsModel} from "./permissions-bearer.model";
import {Role} from "./role.model";

export class User extends PermissionsModel {
    constructor(public id?: number,
                public firstName?: string,
                public lastName?: string,
                public mobilePhoneNumber?: string,
                public workPhoneNumber?: string,
                public password?: string,
                public organization?: Organization,
                public roles?: Role[],
                public email?: string,
                public pin?: number) {
        super();
    }
}

export class ShortUserInfo {
    constructor(public id: number,
                public customerId: string,
                public firstName: string,
                public lastName: string,
                public email: string,
                public workPhone: string,
                public mobilePhone: string) {
    };

    static from(user: User): ShortUserInfo {
        return new ShortUserInfo(
            user.id,
            user.organization.customerId,
            user.firstName,
            user.lastName,
            user.email,
            user.workPhoneNumber,
            user.mobilePhoneNumber
        );
    }
}


export class ReportErrorCreateRequest {
    constructor(public image: string,
                public localizedMessage: string,
                public message: string,
                public stacktrace: string,
                public timestamp: string,
                public userEmailId: string,
                public apiURL: string,
                public frontendURL: string) {
    }
}