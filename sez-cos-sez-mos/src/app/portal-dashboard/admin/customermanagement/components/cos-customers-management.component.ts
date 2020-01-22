import { Component, OnInit, OnDestroy } from '@angular/core';
import { CosEditCustomerComponent } from "./cos-edit-customers/cos-edit-customer.component"
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { StatusdailogComponent } from './statusdailog/statusdailog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { DeletedialogComponent } from './delete-customer/deletedialog.component';
import { Role } from 'src/app/models/role.model';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from '../customer.service';
import { RoleService } from 'src/app/services/role.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';


// Custom models

@Component({
  templateUrl: './cos-customers-management.component.html'
})
export class CosCustomersManagementComponent implements OnInit, OnDestroy {


  protected editDialogComponent = CosEditCustomerComponent;

  authSubordinateRoles: Role[];
  tableData: Customer[] = [];

  // Popup Components
  updateComponent = CosEditCustomerComponent;
  statusComponent = StatusdailogComponent;
  deleteDialog = DeletedialogComponent;

  // Define column for customer management
  columnHeader = ["custName", "name", "custCID", "custPhoneNo", "custEmailId","partnerName","userName","status","actions"];

  // Dynamic Title and Add button
  titleComponent = "customerManagement";
  addbutton = "addCustomer";
  pageLength:number;
  pageSize:number;
  eventValue: any;
  pageIndex: number;
  recordPerPage: number;

  constructor(public customerService: CustomerService,
              public roleService: RoleService,
              public auth: AuthHolderService, private dialog: MatDialog, private domSanitizer : DomSanitizer) {
              // Reload data after status change
                this.customerService.shareDataSubject.subscribe(receiveddata=> {
                    if(receiveddata) {
                      this.reloadData(this.pageIndex,this.recordPerPage);
                    }
                });
           }

  ngOnInit() {
    this.reloadData();
   }

   // For Paging and filtering
   reloadData(indexValue?:number, recordPage?:number, fieldName?:any, fieldValue?:any ) {

      indexValue = (indexValue == null ) ? 1 : indexValue;
      recordPage = (recordPage == null) ? 5 : recordPage;

      this.pageIndex = indexValue;
      this.recordPerPage = recordPage;
      let orfilter = {};

      if(fieldName && fieldValue) {
          if(fieldName == "custName") {
              orfilter['name'] = fieldValue;
          } else if(fieldName == "custPhoneNo") {
              orfilter['phoneNo'] = fieldValue;
          } else if(fieldName == "custCID") {
              orfilter['custId'] = fieldValue;
          } else if(fieldName == "custEmailId") {
              orfilter['emailId'] = fieldValue;
          } else if(fieldName == "partnerName") {
              orfilter = { "user": { "partner.partnerName": fieldValue } };
          } else if(fieldName == "name") {
             orfilter = { "parent": { "name": fieldValue } };
          } else if(fieldName == "userName") {
            orfilter = { "user": { "userName": fieldValue } };
         }
      }


      this.customerService.getCustomerList({"orfilter":{},"andfilter":{},"ascSorting":[],"descSorting":[],"pageNo":indexValue,"recordsPerPage":recordPage}).pipe(map(data => {
        let rec = data.data;
        rec = rec.map(customerRecord => {
            if(customerRecord.userView && customerRecord.userView.partnerView){
              customerRecord['partnerName'] = customerRecord.userView.partnerView['partnerName'];
            }
            if(customerRecord.parent) {
              customerRecord['name'] = customerRecord.parent['name'];
            }
            if(customerRecord.userView) {
              customerRecord['userName'] = customerRecord.userView['userName'];
            }
             if(customerRecord.status == false) {
              customerRecord['status'] = "<a class='badge'>Inactive</a>"
            } else {
              customerRecord['status'] = "<a class='badge isActive'>Active</a>";
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

    ngOnDestroy() {
      this.customerService.shareDataSubject.unsubscribe();
    }

}
