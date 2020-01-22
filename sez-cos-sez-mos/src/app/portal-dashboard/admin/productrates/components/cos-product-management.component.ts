import { Component, OnInit } from '@angular/core';
import { Role } from "../../../../models/role.model";
import { RoleService } from "../../../../services/role.service";
import { AuthHolderService } from "../../../../services/auth-holder.service";
import { CosEditProductComponent } from "./cos-save-edit-product/cos-edit-product.component"
import { MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { DeletedialogComponent } from './delete-product/deletedialog.component';

// Custom models
import { Product } from "../../../../models/product.model";
import { ProductService } from '../product.service'
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './cos-product-management.component.html'
})
export class CosProductManagementComponent implements OnInit {


  protected editDialogComponent = CosEditProductComponent;

  authSubordinateRoles: Role[];
  tableData: Product[] = [];

  // Popup Components
  updateComponent = CosEditProductComponent;
  deleteDialog = DeletedialogComponent;

  // Define column for customer management
  columnHeader = ["name", "categoryName", "autoMobile", "description", "status", "price", "productPriceL1", "productPriceL2", "productPriceL3", "actions"];

  // Dynamic Title and Add button
  titleComponent = "productManagement";
  addbutton = "addProduct";
  pageLength: number;
  pageSize: number;
  eventValue: any;
  pageIndex: number;
  recordPage: number;
  constructor(public productService: ProductService,
    public roleService: RoleService,
    public auth: AuthHolderService, private dialog: MatDialog, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.reloadData();
  }

  // For Paging and filtering
  reloadData(indexValue?: number, recordPage?: number, fieldName?: any, fieldValue?: any) {

    indexValue = (indexValue == null) ? 1 : indexValue;
    recordPage = (recordPage == null) ? 5 : recordPage;

    let orfilter = {};

    if (fieldName && fieldValue) {
      if (fieldName == "categoryName") {
        orfilter = { "productCategory.categoryName": fieldValue }
      } else if (fieldName == "autoMobile") {
        orfilter = { "automationBlueprint.name": fieldValue }
      } else if (fieldName == "price") {
        orfilter = { "rate": fieldValue }
      } else if (fieldName == "productPriceL1") {
        orfilter = { "productRateL1": fieldValue }
      } else if (fieldName == "productPriceL2") {
        orfilter = { "productRateL2": fieldValue }
      } else if (fieldName == "productPriceL3") {
        orfilter = { "productRateL3": fieldValue }
      } else {
        orfilter[fieldName] = fieldValue;
      }
      //orfilter[fieldName] = fieldValue;
    }
    // console.log(orfilter);

    this.productService.getProductList({ "pageNo": indexValue, "recordsPerPage": recordPage, orfilter }).pipe(map(data => {
      let rec = data.data;
      rec = rec.map(customerRecord => {
        if (customerRecord.productCategoryView.categoryName) {
          customerRecord['categoryName'] = customerRecord.productCategoryView['categoryName'];
        }
        if (customerRecord.automationBluprint.name) {
          customerRecord['autoMobile'] = customerRecord.automationBluprint['name'];
        }
        //   customerRecord['inStock'] = (customerRecord.inStock == false) ?
        // this.domSanitizer.bypassSecurityTrustHtml('<span class="btn btn-primary btn-sm">Inactive</span>'): this.domSanitizer.bypassSecurityTrustHtml('<span class="btn btn-primary btn-sm">Active</span>')
        if (customerRecord.inStock == false) {
          customerRecord['status'] = 'Out Of Stock';
        } else {
          customerRecord['status'] = 'In Stock';
        }
        return customerRecord;
      })
      data.data = rec;
      return data;
    })).subscribe(data => {
      this.tableData = data.data;
      this.pageLength = data.totalResult;
      this.pageSize = data.filter.recordsPerPage;
    });
  }


  // Paging for API
  pageChanged(event: any) {
    this.reloadData(event.pageIndex + 1, event.pageSize, null, null);
  }

  // Searched field and its value
  searchValues(eventValue: any) {
    let mydata = eventValue.split('+');
    let fieldName = mydata[1];
    let fieldValue = mydata[0];
    this.reloadData(null, null, fieldName, fieldValue);
  }

}
