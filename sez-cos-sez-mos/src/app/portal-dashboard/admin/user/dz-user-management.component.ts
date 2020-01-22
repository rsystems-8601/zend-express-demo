import {Component} from "@angular/core";
import {MatDialog} from "@angular/material";
import {UserService} from "./user.service";
import {OrganizationService} from "../../../services/organization.service";
import {RoleService} from "../../../services/role.service";
import {DzEditUserComponent} from "./dz-edit-user/dz-edit-user.component";
import {DzBatchCreateUsersComponent} from "./dz-batch-create-users/dz-batch-create-users.component";
import {AuthHolderService} from "../../../services/auth-holder.service";
import {Observable} from "rxjs";
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';
import { Permission } from 'src/app/models/permission.model';
import { PageRequest } from 'src/app/models/page-request.model';
import { Page } from 'src/app/models/page.model';
import { AbstractManagementTableComponent } from 'src/app/shared/abstarct-management-table.component';
import { DataTable } from '../organization/data-table';
import { DeleteUserComponent } from './delete-user/delete-user.component';


@Component({
    templateUrl: "./dz-user-management.component.html"
})
export class DzUserManagementComponent extends DataTable {
    columns = ["firstName", "lastName", "email", "organizationName", "rolesString", "mobilePhoneNumber", "workPhoneNumber", "actions"];
    protected editDialogComponent = DzEditUserComponent;
    deleteDialog= DeleteUserComponent;
    readonly: boolean;
    authSubordinateRoles: Role[];

    constructor(
                public userService: UserService
               ) {


        super();
               }


 protected getData(filters: any) {
    this.userService.getUsersc3(filters).
      subscribe(data => {
        this.tableData = data.data;
        this.pageLength = data.totalResult;
        this.pageSize = data.filter.recordsPerPage;
       this.tableData = this.tableData.map(rec => {
          rec.rolesString = this.roleList(rec.roles) ;  
          return rec;
        })
      });
  }
   roleList(roles:Role[]){
     let rolesStr:string="";
     roles.forEach(v=>{
      rolesStr=rolesStr+v.name+","
     })
     rolesStr = rolesStr.substring(0, rolesStr.length-1);
     return rolesStr;
   }
  userDeleteTrigger(rec){
    if(rec==='OK')
    this.getData(this.getOrgPostDTO)
  }

  const = {
    firstName:"firstName",
    lastName:"lastName",
    email:"email",
    mobilePhoneNumber:"phoneNumber",
    workPhoneNumber:"workPhoneNumber",
    organizationName:{ organization :{"name":"a"}}


  }
  searchValues(eventValue: any) {
   
    let mydata = eventValue.split('+');
    let fieldName = mydata[1];
    let fieldValue = mydata[0];
    let filter = {orfilter: {},andfilter: {},ascSorting: [],descSorting: [],pageNo: 1,recordsPerPage: 10000}
    if(fieldValue){
      if(fieldName==='organizationName')
    filter.orfilter={ organization :{"name":fieldValue}}  
    else
    filter.orfilter[this.const[fieldName]]=fieldValue;  
    console.log(filter)
    this.getData(filter);
    }else
    this.getData(this.getOrgPostDTO)
   // this.reloadData(null, null, fieldName, fieldValue);
 }
    //     this.readonly = !auth.hasPermission(Permission.EDIT_USERS);
    //     this.readonly = false;
    //     if (this.readonly) {
    //         this.removeColumn("actions");
    //     }
    //     if (auth.isOrganizationAdmin()) {
    //         this.removeColumn("organization");
    //     }
    //     roleService.getSubordinateRoles().subscribe(roles => this.authSubordinateRoles = roles);
    // }

    // sendPin(user: User) {
    //     this.userService.sendPin(user.id).spinner().subscribe();
    // }

    // openBatchCreateUserDialog() {
    //     this.dialog.open(DzBatchCreateUsersComponent, {width: "450px"}).afterClosed()
    //         .subscribe(result => result && this.dataSource.reload());
    // }

    // protected getData(pageRequest: PageRequest, filters: any): Observable<Page<User>> {
    //     return this.userService.getUsers(pageRequest, filters);
    // }

    // protected deleteElement(element: User): Observable<any> {
    //     return this.userService.deleteUser(element.id);
    // }
}
