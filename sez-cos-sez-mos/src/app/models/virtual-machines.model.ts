import { PermissionsModel } from "./permissions-bearer.model";

export class VirtualMachines extends PermissionsModel {
        
        public id?:number;
        public virtualMachineName?: string;
        public osVersion?: string;
        public ipAddress?: string;
        public virtualNetwork?:string;
        public cpu?:string;
        public ram?:string;
        public storage?:string;
        public customerName?:string;
        public cid?:number;
        public customerId?:number;
        public createdAt?:string;

}




    