import { Component, OnInit} from '@angular/core';

import { CosEditPartnerComponent } from "./cos-edit-partners/cos-edit-partner.component";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';


// Models and Services for Partner
import { DeletedialogComponent } from './delete-partner/deletedialog.component';
import { Role } from '../../../../models/role.model';
import { Partner } from '../../../../models/partner.model';
import { PartnerService } from '../partner.service';
import { RoleService } from '../../../../services/role.service';
import { AuthHolderService } from '../../../../services/auth-holder.service';

@Component({
  templateUrl: './cos-partners-management.component.html'
})
export class CosPartnersManagementComponent implements OnInit {

  protected editDialogComponent = CosEditPartnerComponent;

  readonly: boolean;
  authSubordinateRoles: Role[];
  tableData: Partner[] = [];
  loadData: Partner
  partnerData: any;
  updateComponent = CosEditPartnerComponent;
  deleteDialog = DeletedialogComponent;
  // Define column for partner management
  columnHeader = ["partnerName","addressView","pid","phoneNumber", "partnerEmail", "actions"];

  // Dynamic Title and Add button
  titleComponent = "partnerManagement";
  addbutton = "addPartner";
  pageLength:number;
  pageSize:number;
  eventValue: any;
  pageIndex: number;
  recordPage: number;
  
  constructor(public partnerService: PartnerService,
              public roleService: RoleService,
              public auth: AuthHolderService) { }

  ngOnInit() {
    this.reloadData();
   }

   // For Paging and filtering
   reloadData(indexValue?:number, recordPage?:number, fieldName?:any, fieldValue?:any ) {
       
      indexValue = (indexValue == null) ? 1 : indexValue;
      recordPage = (recordPage == null) ? 5 : recordPage;
 
      let orfilter = {};
      if(fieldName && fieldValue){
        if(fieldName=="pid") {
          var fieldValue1 = JSON.parse(fieldValue);
          orfilter[fieldName] =  fieldValue1;
        } else if(fieldName == "addressView") {
          fieldName = "address";
          orfilter[fieldName] = { "addressString":  fieldValue};
        }else{
          orfilter[fieldName] = fieldValue;
        }
      }

      this.partnerService.getPartnrList({"pageNo":indexValue,"recordsPerPage":recordPage, orfilter }).pipe(map(data => {
        let rec = data.data;
        rec = rec.map(customerRecord => {
            if(customerRecord.address){
              customerRecord['addressView'] = customerRecord.address['address']
            }
            return customerRecord;
        })
        data.data = rec;
        return data;
      })).subscribe( data => {
        this.tableData = data.data;
        this.pageLength = data.totalResult;
        this.pageSize = data.filter.recordsPerPage;
      });
   }


   // Paging for API
    pageChanged(event:any) {
      this.reloadData(event.pageIndex + 1, event.pageSize, null, null);
    }
    
    // Searched field and its value
    searchValues(eventValue:any) {
        let mydata  = eventValue.split('+');
        let fieldName = mydata[1];
        let fieldValue = mydata[0];
       this.reloadData(null,null, fieldName, fieldValue);
    }



}