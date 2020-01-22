import { Component, Inject, OnInit, AfterViewInit, AfterContentInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup} from "@angular/forms";
// import { OrganizationService} from "../../../../services/organization.service";

// import { RoleService } from "../../../../services/role.service";
// import { AuthHolderService } from "../../../../services/auth-holder.service";
import { AppDateAdapter, APP_DATE_FORMATS} from '../date.adapter';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { Role } from 'src/app/models/role.model';
import { PodServicesService } from '../../pod-services.service';

// For customer custom files 

@Component({
    templateUrl: "./cos-edit-pod-storage.component.html",
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
        ]

})

export class CosEditPodstorageComponent  {

    storageForm: FormGroup;  
    organizationRoles: Role[] = [];
    categoryTitle: string;
    notationidStatus: boolean;
    poddata:number;

    
    
    constructor(@Inject(MAT_DIALOG_DATA) public poddetailData: Storage,
                public dialogRef: MatDialogRef<CosEditPodstorageComponent>,
                // public organizationService: OrganizationService,
                // public roleService: RoleService,
                // public auth: AuthHolderService, 
                public podsService: PodServicesService,
                public formBuilder: FormBuilder) {
                  
        this.storageForm = this.formBuilder.group({
            make: [poddetailData && poddetailData.make],
            name: [poddetailData && poddetailData.name],
            model: [poddetailData && poddetailData.model],
            ownerName: [poddetailData && poddetailData.ownerName],
            ram:[poddetailData && poddetailData.ram],
            cpuName:[poddetailData && poddetailData.cpuName],
            cores:[poddetailData && poddetailData.cores],
            drives:[poddetailData && poddetailData.drives],
            serialNumber: [poddetailData && poddetailData.serialNumber],
            userName: [poddetailData && poddetailData.userName],
            password: [poddetailData && poddetailData.password],
            dateOfPurchase: [poddetailData && poddetailData.dateOfPurchase],
            warrantyPeriod: [poddetailData && poddetailData.warrantyPeriod],
            salesLeaseNumber: [poddetailData && poddetailData.salesLeaseNumber]
        });
 
      
         
       }
    

       saveipmiswitches() { 
        // TorSwitches form value
        let form = {...this.storageForm.value}
        console.log(form);
        this.dialogRef.close();
        if(form!=null) {
            this.podsService.sendstorageInfo(form);
        }
        

        // let createUpdateRequest: CategoryCreateUpdateRequest = {
        //     categoryName: form.categoryName,
        //     categoryDefinition: form.categoryDefinition,
        // };
        // let request$ = this.category
        //     ? this.categoryService.updateUser(this.category.id, createUpdateRequest)
        //     : this.categoryService.saveUser(createUpdateRequest);
    
       // request$.spinner().subscribe(customer => this.dialogRef.close(customer));
    }


    ngOnDestroy() {
        // this.podsService.shareSinglepodid.unsubscribe();
      }

    // updateOrganizationRoles(organizationType: string) {
    //     return this.roleService.getRolesAvailableForOrganizationType(organizationType).subscribe(roles => this.organizationRoles = roles);
    // }
}