import { Component } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { AbstractManagementTableComponent } from '../../../shared/abstarct-management-table.component';
import { Organization } from '../../../models/organization.model';
import { DzEditOrganizationComponent } from './dz-edit-organization/dz-edit-organization.component';
import { UserService } from '../user/user.service';
import { OrganizationService } from '../../../services/organization.service';
import { ApplicationService } from '../application/application.service';
import { AuthHolderService } from '../../../services/auth-holder.service';
import { Permission } from '../../../models/permission.model';
import { PageRequest } from '../../../models/page-request.model';
import { Page } from '../../../models/page.model';
import { StatusService } from 'src/app/services/status.service';
import { OrganizationCosmosService } from 'src/app/services/organization-cosmos.service';
import { DataTable } from './data-table';
import { DeleteOrganizationComponent } from './delete-organization/delete-organization.component';


@Component({
  templateUrl: "./dz-organization-management.component.html",
  styleUrls: ["./dz-organization-management.component.scss"]
})
export class DzOrganizationManagementComponent extends DataTable {


  columns = [
    "name",
    "parentName",
    "cid",
    "type",
    "status",
    "ticketing",
    "mobilePhoneNumber",
    "partnerName",
    "customerRelationshipManagerName",
    "serviceDeliveryManagerName",
    "compliant",
    "twoFactorAuth",
    "actions"
  ];
   editDialogComponent = DzEditOrganizationComponent;
   deleteDialog=DeleteOrganizationComponent;
  constructor(public orgnaizationService: OrganizationCosmosService,
    public auth: AuthHolderService) {
    super();
    this.titleComponent = "orgnaization";
    this.addbutton = "addProduct";

  }

  protected getData(filters: any) {
    this.orgnaizationService.getOrganizations(filters).
      subscribe(data => {
        this.tableData = data.data;
        this.pageLength = data.totalResult;
        this.pageSize = data.filter.recordsPerPage;
        this.tableData = this.tableData.map(rec => {
          rec.id = rec.organizationId;   
          return rec;
        })
      });
  }
  const = {
    name:"name",
    parentName:"parent.name"

  }
  searchValues(eventValue: any) {
   
     let mydata = eventValue.split('+');
     let fieldName = mydata[1];
     let fieldValue = mydata[0];
     let filter = {orfilter: {},andfilter: {},ascSorting: [],descSorting: [],pageNo: 1,recordsPerPage: 10000}
     if(fieldValue){
     filter.orfilter[this.const[fieldName]]=fieldValue;  
     console.log(filter)
     this.getData(filter);
     }else
     this.getData(this.getOrgPostDTO)
    // this.reloadData(null, null, fieldName, fieldValue);
  }
  clickCell(event){

  }

  orgDeleteTrigger(rec){
    console.log('rec' ,rec);
    if(rec==='ACCEPTED')
    this.getData(this.getOrgPostDTO)
  }
}