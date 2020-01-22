import { Component, Inject, OnInit, AfterViewInit, AfterContentInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup} from "@angular/forms";
import { Role } from 'src/app/models/role.model';
import { torSwitches } from 'src/app/models/poddetails.model';
import { PodServicesService } from '../../pod-services.service';
// import { OrganizationService} from "../../../../services/organization.service";

// import { RoleService } from "../../../../services/role.service";
// import { AuthHolderService } from "../../../../services/auth-holder.service";

@Component({
    templateUrl: "./cos-edit-pod.component.html"})

export class CosEditPodTorswitchesComponent  {

    torswitchesForm: FormGroup;  
    organizationRoles: Role[] = [];
    podData: torSwitches[];
    categoryTitle: string;
    notationidStatus: boolean;
    poddata:number;

    
    
    constructor(@Inject(MAT_DIALOG_DATA) public poddetailData: torSwitches,
                public dialogRef: MatDialogRef<CosEditPodTorswitchesComponent>,
                // public organizationService: OrganizationService,
                // public roleService: RoleService,
                // public auth: AuthHolderService,
                 public podsService: PodServicesService,
                public formBuilder: FormBuilder) {
                  
        this.torswitchesForm = this.formBuilder.group({
            make: [poddetailData && poddetailData.make],
            name: [poddetailData && poddetailData.name],
            model: [poddetailData && poddetailData.model],
            ownerName: [poddetailData && poddetailData.ownerName],
            notationId:[poddetailData && poddetailData.notationId],
            serialNumber: [poddetailData && poddetailData.serialNumber],
            usedPorts: [poddetailData && poddetailData.usedPorts],
            totalPorts: [poddetailData && poddetailData.totalPorts]
        });
 
        if(this.torswitchesForm.get('notationId').value==null) {

                let getnotationId = localStorage.getItem('podnotationid');
                let getZeroid = getnotationId.split("+");
                let podnotationId = "TOR"+('0' + getZeroid[1]).slice(-2)+"."+getZeroid[0];
                this.torswitchesForm.get('notationId').setValue(podnotationId);
                this.notationidStatus = false; 
        } else {
            this.notationidStatus = true;
        }

        // this.podsService.shareSinglepodid.subscribe(data => {
        //     this.poddata = data;
        // })
         
       }
    

    saveTorswitches() { 
       
        // TorSwitches form value
        let form = {...this.torswitchesForm.value}
        console.log(form);
        this.dialogRef.close();
        if(form!=null) {
            this.podsService.sendtorInfo(form);
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