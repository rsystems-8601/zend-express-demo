import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup} from "@angular/forms";
import { OrganizationService} from "../../../../../services/organization.service";
import { Role } from "../../../../../models/role.model";
import { RoleService } from "../../../../../services/role.service";
import { AuthHolderService } from "../../../../../services/auth-holder.service";


// For customer custom files
import { ProductsCreateUpdateRequest, ProductService} from "../../product.service";
import { Product, Automationblueprint } from "../../../../../models/product.model";
import { DataTableSharedService } from '../../../../../shared/data-table/data-table.service';

@Component({
    templateUrl: "./cos-edit-product.component.html"})

export class CosEditProductComponent {

    productForm: FormGroup;
    organizationRoles: Role[] = [];
    partnerData: Product[];
    productTitle: string;
    categoryDefnition: string[] = ["Desktop Services", "Virtual Application Services", "Network Services","Telephony",
    "Graphic Requirements","zLink","Applications","Active Directory","Storage",'Compliance',
    "Multi-Factor Authentication","Endpoint Devices","Others"];
    categoryStatus: boolean = false;

    //statusArr:string[] = [true:"Available", fasle:"Out of Stock"];
    statusArr:any = { "In Stock": true, "Out Of Stock": false };
    categoryList: any;
    automationBluprintList: Automationblueprint;
    viewButton: boolean = false;
    public product: Product;
    constructor(
                public organizationService: OrganizationService,
                public productService: ProductService,
                public roleService: RoleService,
                public auth: AuthHolderService,
                public formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private dataTableService: DataTableSharedService) {

              // this.route.data.subscribe(data => {
              //   console.log(data);
              // }
              // )
              this.route.params
              .subscribe( param => {
                console.log(param);
                if(this.dataTableService.getRowData && param.id){
                  this.product = this.dataTableService.getRowData;
                  this.initForm();
                }else if( param.id ){
                  this.router.navigate(['../'],{relativeTo: this.route})
                }else{
                  this.initForm();
                }
              })


    }

    initForm(){
     // Form Data
     this.productTitle = !this.product ? "addProduct" : "editproduct";
     this.productForm = this.formBuilder.group({
         id: [this.product && this.product.id],
         name: [this.product && this.product.name],
         productCategoryId: [this.product && this.product.productCategoryView && this.product.productCategoryView.id],
         inStock: [this.product && this.product.inStock],
         blueprintId: [this.product && this.product.automationBluprint && this.product.automationBluprint.id],
         description: [this.product && this.product.description],
         price:[this.product && this.product.price],
         productPriceL1:[this.product && this.product.productPriceL1],
         productPriceL2:[this.product && this.product.productPriceL2],
         productPriceL3:[this.product && this.product.productPriceL3]
     });

  // Fetching Category Data
     this.productService.getCategory().subscribe(categoryData => {
    this.categoryList = categoryData;
});

// Fetching Automation Bluprint Data
this.productService.getAutomationblueprint().subscribe(automationBluprintData => {
    this.automationBluprintList = automationBluprintData;
});
// To view the content
     if(this.product && this.product.editable === true) {
    this.viewButton = true;
    this.productForm.disable();
 }

    }

    // countryStateInfo(event:any) {
    //    if(event.value=='Others') {
    //        this.categoryStatus = true;
    //    } else {
    //      this.categoryStatus = false;
    //      this.productForm.get('notes').clearValidators();
    //      this.productForm.get('notes').updateValueAndValidity();
    //    }
    // }

    saveProduct() {
      const form = this.productForm.value;
      const createUpdateRequest: ProductsCreateUpdateRequest = {...form};

      const request$ = this.product
       ? this.productService.updateProduct(createUpdateRequest) : this.productService.createProduct(createUpdateRequest);

      request$.subscribe( product => this.redirectToCategoryConfigure());


    }

    redirectToCategoryConfigure() {
      if(this.product){
        this.router.navigate(['../../'], {relativeTo: this.route});
      }else{
        this.router.navigate(['../'], {relativeTo: this.route});
      }
     }

    updateOrganizationRoles(organizationType: string) {
        return this.roleService.getRolesAvailableForOrganizationType(organizationType).subscribe(roles => this.organizationRoles = roles);
    }

    cancelProduct() {
      if(this.product){
        this.router.navigate(['../'], {relativeTo: this.route});
      }else{
        this.router.navigate(['../'], {relativeTo: this.route});
      }

    }

    resetForm() {
      this.productForm.reset();
      if (this.product && this.product.id) {
        this.productForm.patchValue(this.product);
      }
    }

}
