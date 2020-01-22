
export class MasterConfiguration {
    public id?: number;
    public gitHubKey?: number;
    public gitHubUrl?: string;
    public gitPassword?: string;
    public globalVars?: string[];
    public sectionwiseGlobalVars?: sectionGlobalvar[];
    public vpnIP?: string;
}

export class sectionGlobalvar {
    public sectionName?: string;
    public keys?: string[];
}
