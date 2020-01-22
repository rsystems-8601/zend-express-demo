import { Portal } from "@angular/cdk/portal";

export class Datacenter {
        public id?: number;
        public name?: string;
}

export class Vlans {
        public id?:number;
        public name?:string;
}

export class Pods {
        public id?: number;
        public podName: string;
        public networkType?:string;
} 

export class Podlist {
      public data?:recordData;
      public totalResult?:number;
}

export class rackType {
  reduce(arg0: (acc: any, curr: any) => any, arg1: {}) {
    throw new Error("Method not implemented.");
  }
        public id?:number;
        public name?:string;
   }

export class recordData {
        public id?: number;
        public dataCenter?: string;
        public podName?: string;
        public customerName?: string;
        public cid?: string;
        public vlanIdString?:string;
}


export class DataCenterType{
        public id:number;
        public name: string;
}
export class HardwareClusters {
        public maxHwCluster?:number;
        public hardwareClusterList?:HardwareClusterList;
} 

export class HardwareClusterList {
        public id?:number;
        public name?:string;  
}

export class CreateHardwarecluster {
        public id?: number; 
        public name?:string;
        public podId?:number;
}

export class VrrpGroup {
        public id?:number;
        public publicVlan?:number;
        public vrrpGroupId?:number;
        public vrrpgroupIdString?:string;
}

export class Dvswitch {
        public name?:string;
        public port?:Port[];
}

export class Port {
        public name?:string;
        public vlan?:number;
}


    