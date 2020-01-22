import { Component, OnInit } from '@angular/core';
import { Role } from "../../../../models/role.model";
import { RoleService } from "../../../../services/role.service";
import { AuthHolderService } from "../../../../services/auth-holder.service";
import { CosEditCategoryComponent } from "./cos-save-edit-category/cos-edit-category.component"
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DeletedialogComponent } from './delete-category/deletedialog.component';

// Custom models
import { Category } from "../../../../models/category.model";
import { CategoryService } from '../../../datacenter/services/category.service';


@Component({
  templateUrl: './cos-category-management.component.html'
})
export class CosCategoryManagementComponent implements OnInit {


  protected editDialogComponent = CosEditCategoryComponent;

  authSubordinateRoles: Role[];
  tableData: Category[] = [];

  // Popup Components
  updateComponent = CosEditCategoryComponent;
  deleteDialog = DeletedialogComponent;

  // Define column for customer management
  columnHeader = ["categoryName", "categoryDefinition", "actions"];

  // Dynamic Title and Add button
  titleComponent = "categoryManagement";
  addbutton = "addategory";
  pageLength:number;
  pageSize:number;
  eventValue: any;
  pageIndex: number;
  recordPage: number;
  constructor(public categoryService: CategoryService,
              public roleService: RoleService,
              public auth: AuthHolderService, private dialog: MatDialog, private domSanitizer : DomSanitizer) { }

  ngOnInit() {
    this.reloadData();
    this.categoryService.categortyChanged.subscribe(data => {
      if (data) {
        this.reloadData();
      }
    });
   }

   // For Paging and filtering
   reloadData(indexValue?:number, recordPage?:number, fieldName?:any, fieldValue?:any ) {

      indexValue = (indexValue == null) ? 1 : indexValue;
      recordPage = (recordPage == null) ? 5 : recordPage;

      let orfilter = {};

      if(fieldName && fieldValue){
          orfilter[fieldName] = fieldValue;
        }

      this.categoryService.getCategoryList({"pageNo":indexValue, "recordsPerPage":recordPage, orfilter })
      .subscribe( data => {
        this.tableData = data.data;
        this.pageLength = data.totalResult;
        this.pageSize = data.filter.recordsPerPage;
      });
   }

  //  deleteElement(customer: string) {
  //    return this.categoryService.sendMessage(customer);
  //  }

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
