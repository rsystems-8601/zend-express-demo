
import { PermissionsModel } from "./permissions-bearer.model";

export class CustomerAssignment extends PermissionsModel {

             public id : number;
             public customerId: number;
             public customerName : string;
             public cid : number;
             public productId: number;
             public product : string;
             public dataCenterId:number;
             public datacenter: string;
             public podId: number;
             public pod :string;
             public dvSwitch: string;
             public dvPortGroup : string;
             public privateNetworkSize: string;
             public privateIpId: number;
             public privateIP: string;
             public privateDomainName: string;
             public publicURL: string;
             public publicIpId1 : string;
             public publicIP1: string;
             public publicIpId2 : string;
             public publicIP2 : string;
             public publicIpId3 : string;
             public publicIP3: string;
             public vlanId: number;
             public vLan: string;
             public hwClusterId: number;
             public podHWCluster: string;
             public vrrpGroupId : string;
             public vrrGroupSyncName : string;
             public vrrP: Vrrp;
             public password: string;
             public createdOn: string;
             public legacyOrder : boolean;

}



export class CustomerSearch {
    constructor(public custId: number, public custName: string) {}
  }


export class PodChildrens {
      public podId: number;
      public podName: string;
      public vrrp: Vrrp;
      public hwClusters: HwCluster;
      public vlans: Vlans;
  }

  // Hardware Cluster
  export class HwCluster {
      public id: number;
      public name: string;
  }

  // Vrrp
  export class Vrrp {
    public id: number;
    public vrrpGroupId: number;
    public vrrpgroupIdString: string;
    public publicVlan: number;
}

  // Hardware Vlans
  export class Vlans {
    public id: number;
    public name: string;
}


