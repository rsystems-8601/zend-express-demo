
export class Poddetails {
        public id?: number;
        public podName?: string;
        public podNotationId?:string;
        public domain?:string;
        public managementUrl?:string;
        public additionalInfo?:string;
        public rackUnits?:number;
        public datacenterSlot?:number;
        public vCenter?:vCenter;
        public environmentType?:string;
        public dataCenterId?:number;
        public hwClustersCount?:number;
        public maximumHwClusters?:number;
        public torSwitchesCount?:number;
        public maxTorSwitches?:number;
        public tenGBSwitchesCount?:number;
        public max10GBSwitches?:number;
        public iPMISwitchesCount?:number;
        public maxIPMISwitches?:number;
        public serversCount?:number;
        public maxServers?:number;
        public storageClustersCount?:number;
        public maxStorageClusters?:number;
        public networkType?:string[];
        public torSwitches?:torSwitches[];
        public tenGBSwitches?:tenGBSwitches[];
        public iPMISwitches?:iPMISwitches[];
        public servers?:Servers[];
        public storageCluster?:Storage[];
}

export class vCenter {
        public id?:number;
        public name?: string;
        public url?: string;
        public version?: string;
        public privateIP?: string;
        public vCenterpassword?:string;
}

export class torSwitches {
        public make?:string;
        public model?:string;
        public name?:string;
        public notationId?:string;
        public ownerId?:number;
        public ownerName?:string;
        public serialNumber?:number;
        public totalPorts?:number;
        public usedPorts?:number;
}

export class tenGBSwitches {
        public make?:string;
        public model?:string;
        public name?:string;
        public notationId?:string;
        public ownerId?:number;
        public ownerName?:string;
        public serialNumber?:number;
        public totalPorts?:number;
        public usedPorts?:number;  
}

export class iPMISwitches {
        public make?:string;
        public model?:string;
        public name?:string;
        public notationId?:string;
        public ownerId?:number;
        public ownerName?:string;
        public serialNumber?:number;
        public totalPorts?:number;
        public usedPorts?:number;  
}

export class Storage {
        public cores?:number;
        public cpuName?:string;
        public cpuTypeId?:number;
        public dateOfPurchase:Date;
        public drives?:string;
        public id?:number;
        public make?:string;
        public model?:string;
        public name?:string;
        public ownerId?:number;
        public ownerName?:string;
        public password?:string;
        public ram?:number
        public salesLeaseNumber?:string;
        public serialNumber?:string;
        public userName?:string;
        public warrantyPeriod?:number;
}

export class Servers {
        public cores?:number;
        public cpuName?:string;
        public cpuTypeId?:number;
        public dateOfPurchase:Date;
        public drives?:string;
        public id?:number;
        public make?:string;
        public model?:string;
        public name?:string;
        public ownerId?:number;
        public ownerName?:string;
        public password?:string;
        public ram?:number
        public salesLeaseNumber?:string;
        public serialNumber?:string;
        public userName?:string;
        public warrantyPeriod?:number;
}

export class PodCreate {
        start?:number;
	last?:number;
	dataCenter?:number;
	pod?:number;
}

export class PrivateVlanfilterdata {
        id?:number;
        dataCenter?:string;
        podName?:string;
        customerName?:string;
        cid?:number;
        vlanIdString?:string;
        totalResult?:number;
        recordsPerPage?:number;
}



    