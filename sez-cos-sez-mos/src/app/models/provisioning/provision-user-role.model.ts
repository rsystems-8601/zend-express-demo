import { PermissionsModel } from 'src/app/models/permissions-bearer.model';

export class UserRole extends PermissionsModel {
    constructor(					
        public userRoleSALES: Array<UserRoleDetail> = [], 	
        public userRoleSE: Array<UserRoleDetail> = [], 		
        public userRolePCO: Array<UserRoleDetail> = [], 		
        public userRoleLOE: Array<UserRoleDetail> = [], 		
        public userRoleVSA: Array<UserRoleDetail> = [], 		
        public userRoleVSE: Array<UserRoleDetail> = [], 		
        public userRoleCRM: Array<UserRoleDetail> = [], 		
        public userRoleSDM: Array<UserRoleDetail> = []) {
        super();
    }
}


class UserRoleDetail extends PermissionsModel{
    constructor(public id: number,
        public firstName: String,
        public lastName : String){
            super()
        }
}
