export interface HVVr {
     environmentType: string;
     podId: number;
     podName: string;
     title: string;
     description: string;
     done: boolean;
      vrrp: Vrrp[];
      hwClusters: HwCluster[];
      vlans: Vlans[];
   }
 
 
     // Hardware Cluster
     export class HwCluster {
          id: number;
          name: string;
     }
   
     // Vrrp
     export interface Vrrp {
        id: number;
        vrrpGroupId: number;
        vrrpgroupIdString: string;
        publicVlan: number;
   }
   
     // Hardware Vlans
     export interface Vlans {
        id: number;
        name: string;
   }