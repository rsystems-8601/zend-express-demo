import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup} from "@angular/forms";
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/portal-dashboard/datacenter/services/category.service';
// import { OrganizationService} from "../../../../services/organization.service";
// import { Role } from "../../../../models/role.model";
// import { RoleService } from "../../../../services/role.service";
// import { AuthHolderService } from "../../../../services/auth-holder.service";


// For customer custom files 


@Component({
    templateUrl: "./cos-edit-private-vlan.component.html"})

export class CosEditPrivatevlanComponent {

    categoryForm: FormGroup;  
    // organizationRoles: Role[] = [];
    partnerData: Category[];
    categoryTitle: string;
    categoryDefnition: string[] = ["Desktop Services", "Virtual Application Services","Network Services","Telephony",
    "Graphic Requirements","zLink","Applications","Active Directory","Storage","Compliance","Multi-Factor Authentication","Endpoint Devices","Others"];
    categoryStatus: boolean = false;

    
    constructor(@Inject(MAT_DIALOG_DATA) public category: Category,
                public dialogRef: MatDialogRef<CosEditPrivatevlanComponent>,
                // public organizationService: OrganizationService,
                public categoryService: CategoryService,
                // public roleService: RoleService,
                // public auth: AuthHolderService,
                public formBuilder: FormBuilder) {


        // Form Data
        this.categoryTitle = Object.keys(category).length === 0 ? "addCategory" : "editCategory";
        this.categoryForm = this.formBuilder.group({
            categoryName: [category && category.categoryName],
            categoryDefinition: [category && category.categoryDefinition],
            notes: [category && category.notes]
        });

         
        
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
       
         
        //if(this.categoryForm=='VALID')  
        let form = this.categoryForm.value;
        //console.log(form);
        
        this.dialogRef.close();
        // let createUpdateRequest: CategoryCreateUpdateRequest = {
        //     categoryName: form.categoryName,
        //     categoryDefinition: form.categoryDefinition,
        // };
        // let request$ = this.category
        //     ? this.categoryService.updateUser(this.category.id, createUpdateRequest)
        //     : this.categoryService.saveUser(createUpdateRequest);
    
       // request$.spinner().subscribe(customer => this.dialogRef.close(customer));
    }

    // updateOrganizationRoles(organizationType: string) {
    //     return this.roleService.getRolesAvailableForOrganizationType(organizationType).subscribe(roles => this.organizationRoles = roles);
    // }
}