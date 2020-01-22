export class UserProfile {

    constructor(
        public firstName?: string,
        public lastName?: string,
        public organizationName?: string,
        public email?: string,
        public mobilePhoneNumber?: string,
        public workPhoneNumber?: string,
        public notificationMethods?: Array<string>,
        public pin?: number
    ) {
    }
}

export interface LoggedInUser {
    id: number;
    firstName: string;
    isDeleted: boolean;
    isEnabled: boolean;
    lastName: string;
    updatedAt: string;
    updatedBy: number;
    userName: string;
    email: string;
    phoneNumber: string;
    isAction: boolean;
    name: string;
}