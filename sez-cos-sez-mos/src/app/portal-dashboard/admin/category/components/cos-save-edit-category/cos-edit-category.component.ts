import { DataTableSharedService } from './../../../../../shared/data-table/data-table.service';
import { Component, Inject } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup} from "@angular/forms";
import { OrganizationService} from "../../../../../services/organization.service";
import { Role } from "../../../../../models/role.model";
import { RoleService } from "../../../../../services/role.service";
import { AuthHolderService } from "../../../../../services/auth-holder.service";


// For customer custom files
import { Category } from "../../../../../models/category.model";
import { CategoryService, CategoryCreateUpdateRequest } from 'src/app/portal-dashboard/datacenter/services/category.service';

@Component({
    templateUrl: "./cos-edit-category.component.html"})

export class CosEditCategoryComponent {

    categoryForm: FormGroup;
    organizationRoles: Role[] = [];
    partnerData: Category[];
    categoryTitle: string;
    categoryDefnition: string[] = ["Desktop Services", "Virtual Application Services","Network Services","Telephony",
    "Graphic Requirements","zLink","Applications","Active Directory","Storage","Compliance","Multi-Factor Authentication","Endpoint Devices","Others"];
    categoryStatus: boolean = false;
    viewButton: boolean = false;
    public category: Category;

    constructor(
                public organizationService: OrganizationService,
                public categoryService: CategoryService,
                public roleService: RoleService,
                public auth: AuthHolderService,
                public formBuilder: FormBuilder,
                public route: ActivatedRoute,
                private router: Router,
                private dataTableService: DataTableSharedService

              ) {

                this.route.params
                .subscribe( param => {
                  console.log(param);
                  if(this.dataTableService.getRowData && param.id){
                    this.category = this.dataTableService.getRowData;
                    this.initForm();
                  }else if( param.id ){
                    this.category = new Category();
                    this.router.navigate(['../'],{relativeTo: this.route})
                  }else{
                    this.category = new Category();
                    this.initForm();
                  }
                })

    }


    initForm(){
      this.categoryTitle = this.category && this.category.id ?  "editCategory" : "addCategory";
      this.categoryForm = this.formBuilder.group({
          categoryName: [this.category && this.category.categoryName],
          categoryDefinition: [this.category && this.category.categoryDefinition],
          notes: [this.category && this.category.notes]
      });

      // if(this.category && this.category.editable === true) {
      //     this.viewButton = true;
      //     this.categoryForm.disable();
      //  }
    }

    countryStateInfo(event:any) {
       if(event.value=='Others') {
           this.categoryStatus = true;
       } else {
         this.categoryStatus = false;
         this.categoryForm.get('notes').clearValidators();
         this.categoryForm.get('notes').updateValueAndValidity();
       }
    }

    saveCategory() {
      const form = this.categoryForm.value;
      const createUpdateRequest: Category = {...this.category, ...form};

      const request$ = this.category && this.category.id
            ? this.categoryService.updateCategory(createUpdateRequest)
            : this.categoryService.saveCategory(createUpdateRequest);

      request$.subscribe(customer => this.cancelCategory());
    }


     cancelCategory(){
      if(this.category && this.category.id){
        this.router.navigate(['../../configure'],{relativeTo: this.route});
      }else{
        this.router.navigate(['../configure'],{relativeTo: this.route});
      }
    }

    updateOrganizationRoles(organizationType: string) {
        return this.roleService.getRolesAvailableForOrganizationType(organizationType).subscribe(roles => this.organizationRoles = roles);
    }
}
