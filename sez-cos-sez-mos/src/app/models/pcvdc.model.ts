
export class Pcvdc {
    public id?:number;
    public custCID?:number;
    public customerId?:number;
    public customerName?:string;
    public customerType?:string;
    public privateDomainName?:string;
    public product?:number;
    public datacenter?:number;
    public podId?:number;
    public vlanId?:number;
    public vrrpId?:number;
    public hwClusterId?:number;
    public publicIp1?:number;
    public publicIp2?:number;
    public publicIp3?:number;
    public privateIP?:number;
    public publicURL?:string;
    public dvSwitch?:string;
    public dvPortGroup?:string;
    public publicIpIdsNPublicIps?:string[];
    public virutalMachines?:VirtualMachines;
    public pcvdsComponents?:Pcvdccomponent;
}

export class VirtualMachines {
    public id?:number;
    public virtualMachineName?:string;
    public osVersion?:string;
    public ipAddress?:string;
    public cpu?:number;
    public ram?:string;
    public storage?: string;
    public customerName?: string;
    public createdAt?: string;
    public podId?:number;
}

export class Pcvdccomponent {
    public lookupId?:number 
    public lookupName?:string;
    public lookupDescription?:string;
    public lookupCode?:string;
    public lookupTypeId?:number;
    public status?: boolean;
    public updatedDate?: string;
    public  updatedBy?: string;
    public createdDate?: string;
    public  createdBy?: string;
}

