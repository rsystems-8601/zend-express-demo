
import { PermissionsModel } from "./permissions-bearer.model";

export class Managejob extends PermissionsModel {
        public contractId?: number;
        public applianceName?: string;
        public id?: number;
        public jobID?: string;
        public custCID?: number;
        public orderProductid?: number;
        public provisioningRequestID?:string;
        public status?: string;
        public updatedAt?:string;
}



export class Managejobvars {
    map(arg0: (rec: any) => void) {
        throw new Error("Method not implemented.");
    }
        
                public active_directory_domain_name?: string;
                public ad_domain_mode?:string;
                public ad_domain_password?:string;
                public ad_forest_mode?:string;
                public bash_binary?:string;
                public buildScope?:string;
                public certificate_name?:string;
                public certificate_password?:string;
                public config_script_folder?:string;
                public connection_server_licence_key?:string;
                public customer_id?:number;
                public customer_name?:string;
                public default_lb_WebUI_password?:string;
                public desktop_cluster_name?:string;
                public dv_port_number?:number;
                public dv_switch_name?:string;
                public dyn_customer?:string;
                public dyn_password?:string;
                public dyn_username?:string;
                public dyn_zone_name?:string;
                public event_database_name?:string;
                public event_database_password?:string;
                public event_database_port?:string;
                public event_database_record_active_span?:string;
                public event_database_server?:string;
                public event_database_table_prefix?:string;
                public event_database_type?:string;
                public event_database_username?:string;
                public firewall_time_zone?:string;
                public group_id?:number;
                public has_igel?:string;
                public host_temp_folder?:string;
                public id?:number;
                public infra_cluster_name?:string;
                public job_type?:string;
                public linux_vm_guest_temp_folder?:string;
                public linux_vm_password?:string;
                public linux_vm_username?:string;
                public load_balancer_vm_template?:string;
                public loadbalancer_password?:string;
                public loadbalancer_username?:string;
                public network_integration_type?:string;
                public nsx_manager_password?:string;
                public nsx_manager_url?:string;
                public nsx_manager_username?:string;
                public pod_location?:string;
                public powershell_binary?:string;
                public private_domain_name?:string;
                public private_ip_address?:string;
                public provisioning_job_id?:string;
                public public_connection_server_url?:string;
                public public_dv_port_group?:string;
                public public_ip: publicIp;
                public secondary_infra_cluster_name?:string;
                public task_id?:number;
                public uag_vm_template?:string;
                public vcenter_password?:string;
                public vcenter_url?:string;
                public vcenter_username?:string;
                public view_extra_bundle_filename?:string;
                public view_server_datastore_filename?:string;
                public view_server_datastore_folder?:string;
                public view_server_datastore_name?:string;
                public view_server_primary_datastore_name?:string;
                public view_server_recovery_password?:string;
                public view_server_recovery_password_reminder?:string;
                public view_server_secondary_datastore_name?:string;
                public vlan_id?:string;
                public vrrp_authentication_password?:string;
                public vrrp_group_id?:string;
                public vrrp_group_sync_name?:string;
                public vyos_firewall_password?:string;
                public vyos_firewall_username?:string;
                public vyos_firewall_vm_template?:string;
                public windows_os_customizationspec?:string;
                public windows_vm_guest_temp_folder?:string;
                public windows_vm_password?:string;
                public windows_vm_template?:string;
                public windows_vm_username?:string;
                public zlink_enable?:string;
            
}



export class publicIp {
        public address?:string;
        public cidr?:string;
        publicgateway?:string;
}


export class Jobstatuspool {
        public groupId?:number;
        public groupDescription?:string;
        public tasks:Task[];
}


export class Task {
        public taskId?:number;
        public task?:string;
        public name?:string;
        public status?:string;
}


export class JobvarsFormdata {
        public orderProductid?:number;
        public jobId?:number;
        public customerId?:number;
        public customerName?:string;
        public cid?:number;
        public productId?:number;
        public product?:Product[];
        public dataCenterId?:number;
        public datacenter?:string;
        public podId?:number;
        public pod?:string;
        public dvSwitch?:string;
        public dvPortGroup?:string;
        public privateNetworkSize?:number;
        public privateIpId?:number;
        public privateIP?:string;
        public privateDomainName?:string;
        public publicURL?:string;
        public publicIpId1?:string;
        public publicIP1?:string;
        public publicIpId2?:string;
        public publicIP2?:string;
        public publicIpId3?:number;
        public publicIP3?:string;
        public vlanId?:string;
        public vLan?:string;
        public hwClusterId?:number;
        public podHWCluster?:string;
        public vrrpGroupId?:number;
        public vrrGroupSyncName?:string;
        public password?:string;
        public podVars?:Managejobvars;
        public vCenterTemplates?:string[];
        public vCenterGlobalLibTemplates?:string[];
        public vCenterGlobalLibOtherTypeSoftwares?:string[];
        public vCenterLocalLibTemplates?:string[];
        public vCenterLocalLibOtherTypeSoftwares?:string[];
        public eventDBTablePrefix?:string;
        public secondaryHWClusterId?:number;
        public desktopClusterId?:number;
        public buildScope?:string;
        public localLibOvaTemplates:string[];
        public vCenterDesktopPoolCloneTemplates:string[];
}


export class Product {
        public id?:number;
        public name?:string;
        public price?:number;
        public inStock?:boolean;
        public automationBluprint?:AutomationBluprint;
}

export class AutomationBluprint {
        public id?:number;
        public name?:string;
        public description?:string;
        public createdBy?:number;
        public isDeleted?:boolean;
}




    