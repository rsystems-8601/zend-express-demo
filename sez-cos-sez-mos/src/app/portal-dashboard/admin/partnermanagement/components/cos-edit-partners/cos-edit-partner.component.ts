import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";
import { Role } from '../../../../../models/role.model';
import { Partner } from '../../../../../models/partner.model';
import { OrganizationService } from '../../../../../services/organization.service';
import { PartnerService, PartnerCreateUpdateRequest } from '../../partner.service';
import { RoleService } from '../../../../../services/role.service';
import { AuthHolderService } from '../../../../../services/auth-holder.service';



// Models and services

@Component({templateUrl: "./cos-edit-partner.component.html"})

export class CosEditPartnerComponent {

    partnerForm: FormGroup;  
    organizationRoles: Role[] = [];
    countryList:any;
    stateList:any;
    countryName:any;
    stateIdone: any;
    partnerTitle: any;
    viewButton: boolean =false;
    

    constructor(@Inject(MAT_DIALOG_DATA) public partner: Partner,
                public dialogRef: MatDialogRef<CosEditPartnerComponent>,
                public organizationService: OrganizationService,
                public partnerService: PartnerService,
                public roleService: RoleService,
                public auth: AuthHolderService,
                public formBuilder: FormBuilder) {

        // Title for Add and Edit Form
        this.partnerTitle = Object.keys(partner).length === 0 ? "addPartner" : "editPartner";
        
        this.partnerForm = this.formBuilder.group({
            partnerName: [partner && partner.partnerName],
            partnerEmail: [partner && partner.partnerEmail],
            phoneNumber: [partner && partner.phoneNumber],
            address1: [partner && partner.address && partner.address.address1],
            address2: [partner && partner.address && partner.address.address2],
            cityName: [partner &&  partner.address && partner.address.cityView && partner.address.cityView.cityName],
            countryName: [partner && partner.address && partner.address.cityView && partner.address.cityView.stateView
                && partner.address.cityView.stateView.countryView && partner.address.cityView.stateView.countryView.countryId],
            stateName: [partner && partner.address && partner.address.cityView  && partner.address.cityView.stateView && partner.address.cityView.stateView.stateId],
            zipCode: [partner && partner.address &&  partner.address.zipCode]
        });

        // Fetching Country
        this.partnerService.getCountry().subscribe(countryData => {
            this.countryList = countryData;
        });

        // Seleced state on the selected country id
        let countryIdoneChange = this.partnerForm.get('countryName').value;
        if(countryIdoneChange) {
            this.partnerService.getState(countryIdoneChange).subscribe((data) => {
                this.stateList = data;
            });
        }
        
        if(partner.editable===true) {
            this.viewButton = true;
            this.partnerForm.disable();
         }
		 
    }

    // Fetching States on the basis of country Id
    countryStateInfo(countryId) {
        this.partnerService.getState(countryId.value).subscribe((data) => {
            this.stateList = data;
        });
    }
  
    // Data save
    savePartner() {    
        let form = this.partnerForm.value;
        let createUpdateRequest: PartnerCreateUpdateRequest = {
        partnerName: form.partnerName,
        phoneNumber: form.phoneNumber.replace(/[^a-zA-Z0-9 ]/g, ""),
        email: form.partnerEmail,
        address1: form.address1,
        address2:form.address2,
        cityName: form.cityName,
        stateId :form.stateName,
        countryId:form.countryName,
        zipCode:form.zipCode,
        city:null,
        partnerId:null
        };
        
        if(this.partner && this.partner.partnerId){
            createUpdateRequest.partnerId = <number>this.partner.partnerId;
        }
        let request$ = this.partner.partnerId
            ? this.partnerService.updatePartner(createUpdateRequest)
            : this.partnerService.savePartner(createUpdateRequest);
        // let request$ = this.partnerService.savePartner(createUpdateRequest);
        request$.spinner().subscribe(partner => this.dialogRef.close(partner));
    }
}