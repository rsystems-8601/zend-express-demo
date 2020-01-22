export class NetworkIps {
    public id?: number; 
    public networkIp?: string;
    public cidrNumber?: number;
    public gateway?: string;
    public subnetMask?: string;
    public type?: boolean;
    public environment?: string;
    public ipId?: string;
    public datacenterView?: {};
    public vlanView?: vlanView;
    public environmentType?:string;
    public ipType?:string;
    public dataCenterId?:number;
    public vlanId?:string;
}

export class vlanView {
    public id?: number; 
    public name?: string; 
}