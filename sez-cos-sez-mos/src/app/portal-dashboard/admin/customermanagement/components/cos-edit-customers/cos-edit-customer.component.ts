import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup} from "@angular/forms";



// For customer custom files 


import { map } from "rxjs/operators";
import { Customer, Partnerparent } from 'src/app/models/customer.model';
import { Useriew } from 'src/app/models/userview.model';
import { CustomerService, CustomerCreateUpdateRequest } from '../../customer.service';
import { Role } from 'src/app/models/role.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { RoleService } from 'src/app/services/role.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';

@Component({
    templateUrl: "./cos-edit-customer.component.html"})

export class CosEditCustomerComponent {

    customerForm: FormGroup;  
    organizationRoles: Role[] = [];
    countryList:any;
    stateList:any;
    cityList:any;
    country:any;
    customerTitle: string;
    countryName:any;
    stateIdone: any;
    partnerData: Customer[];
    parentCustomerlist: Partnerparent[]
    userAssigned: Useriew[];
    complient: any;
    viewButton: boolean = false;
    
    
    constructor(@Inject(MAT_DIALOG_DATA) public customer: Customer,
                public dialogRef: MatDialogRef<CosEditCustomerComponent>,
                public organizationService: OrganizationService,
                public customerService: CustomerService,
                public roleService: RoleService,
                public auth: AuthHolderService,
                public formBuilder: FormBuilder) {

        this.customerTitle = Object.keys(customer).length === 0 ? "addCustomer" : "editCustomer";
        
        // let uniqueEmailValidator = DzValidators.asyncUnique(email => customerService.checkEmailUnique(email), customer && customer.custEmailId);
        this.customerForm = this.formBuilder.group({
            custName: [customer && customer.custName],
            firstName: [customer && customer.firstName],
            lastName: [customer && customer.lastName],
            customerShortName:[customer && customer.customerShortName],
            email: [customer && customer.custEmailId, []],
            phone: [customer && customer.custPhoneNo],
            workPhoneNumber: [customer && customer.mobileNo],
            cid: [customer && customer.custCID],
            address1: [customer && customer.addressView && customer.addressView.address1],
            address2: [customer && customer.addressView && customer.addressView.address2],
            countryName: [customer && customer.addressView && customer.addressView.cityView && customer.addressView.cityView.stateView
                && customer.addressView.cityView.stateView.countryView && customer.addressView.cityView.stateView.countryView.countryId],
            stateName: [customer && customer.addressView && customer.addressView.cityView  && customer.addressView.cityView.stateView && customer.addressView.cityView.stateView.stateId],
            cityName: [customer &&  customer.addressView && customer.addressView.cityView &&  customer.addressView.cityView.cityId],
            zipCode: [customer && customer.addressView &&  customer.addressView.zipCode],
            partnerName: [customer && customer.userView  && customer.userView.partnerView && customer.userView.partnerView.partnerId],
            parentCustomer: [customer && customer.parent && customer.parent.id],
            userAsigned:[customer && customer.userView && customer.userView.id],
            isCompliant: [customer && customer.isCompliant]
        });
       
        this.complient  = this.customerForm.get('isCompliant').value;
 
        // Fetching Country
        this.customerService.getCountry().subscribe(countryData => {
            this.countryList = countryData;
        });

        // Seleced state on the selected country id
        let countryIdoneChange = this.customerForm.get('countryName').value;
        if(countryIdoneChange) {
            this.customerService.getState(countryIdoneChange).subscribe((data) => {
                this.stateList = data;
            });
        } 

         // Seleced city on the selected state id
         let stateIdoneChange = this.customerForm.get('stateName').value;
         if(stateIdoneChange) {
             this.customerService.getCity(stateIdoneChange).subscribe((data) => {
                 this.cityList = data;
             });
         }

         let partnerChange = this.customerForm.get('partnerName').value;
         if(partnerChange) {
            // Parent Customers  
            this.customerService.getParentcustomers(partnerChange).subscribe((data:Partnerparent[]) => {
                 this.parentCustomerlist = data;
            });

          // Assinged Users
          this.customerService.getAsignedusers(partnerChange).subscribe((data: Useriew[]) => {
              this.userAssigned = data;
           });
         }

         // Partner list
         this.customerService.getPartner().pipe(map(data => data.data)).subscribe((res:Customer[]) => {
             this.partnerData = res;
         });

         // Call for view popup
         if(customer.editable===true) {
            this.viewButton = true;
            this.customerForm.disable();
         }
           
    }

    // Fetching States on the basis of country Id
    countryStateInfo(countryId:any) {
        this.customerService.getState(countryId.value).subscribe((data) => {
            this.stateList = data;
        });
    }

    // Fetching Cities on the basis of country Id
    stateCityInfo(stateId:any) {
        this.customerService.getCity(stateId.value).subscribe((data) => {
            this.cityList = data;
        });
    }

    partnerInfo(partnerId:any) {
       // Parent Customers  
       this.customerService.getParentcustomers(partnerId.value).subscribe((data:Partnerparent[]) => {
            this.parentCustomerlist = data;
       });
       // Assinged Users
       this.customerService.getAsignedusers(partnerId.value).subscribe((data: Useriew[]) => {
        this.userAssigned = data;
      });
    }


    // getStates() {
    //   return this.customerService.getStates(this.country);
    // }
  
    saveUser() {    
        let form = this.customerForm.value;
        let createUpdateRequest: CustomerCreateUpdateRequest = {
            custName: form.custName,
            custPhoneNo: form.custPhoneNo,
            custEmailId: form.custEmailId,
            address1: form.address1, 
            address2:form.address2
        };
        let request$ = this.customer
            ? this.customerService.updateUser(this.customer.custId, createUpdateRequest)
            : this.customerService.saveUser(createUpdateRequest);
    
        request$.spinner().subscribe(customer => this.dialogRef.close(customer));
    }

    // updateOrganizationRoles(organizationType: string) {
    //     return this.roleService.getRolesAvailableForOrganizationType(organizationType).subscribe(roles => this.organizationRoles = roles);
    // }
}