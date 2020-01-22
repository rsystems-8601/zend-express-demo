import { AddressView } from "./address1.model";
import { PermissionsModel } from "./permissions-bearer.model";
import { Useriew } from "./userview.model";

export class Partnerparent {
        id: number;
        name: string;
}

export class Customer extends PermissionsModel {
        public custId?: number;
        public custName?: string;
        public firstName?:string;
        public lastName?:string;
        public mobileNo?:string;
        public custPhoneNo?: number;
        public custEmailId?: string;
        public custCID?: number;
        public addressView?: AddressView;
        public parent?: Partnerparent;
        public userView?: Useriew;
        public status?: boolean;
        public isCompliant?:boolean;
        public customerShortName?:string;
        // public viewOnly?:boolean;
}




    