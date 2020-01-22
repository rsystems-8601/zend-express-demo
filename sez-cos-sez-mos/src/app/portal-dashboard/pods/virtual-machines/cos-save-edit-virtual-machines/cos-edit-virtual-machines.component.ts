import { Component, Inject, OnInit, OnChanges } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormBuilder, FormGroup, FormControl} from "@angular/forms";
// import { OrganizationService} from "../../../../services/organization.service";
// import { RoleService } from "../../../../services/role.service";
// import { AuthHolderService } from "../../../../services/auth-holder.service";
// For customer custom files 

// import { CreateHardwarecluster } from "../../../../../models/cos-common.model";

import { VirtualMachines } from 'src/app/models/virtual-machines.model';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, switchMap, catchError, map, tap } from 'rxjs/operators';
import { VirtualMachinesService } from '../virtual-machines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableSharedService } from 'src/app/shared/data-table/data-table.service';


@Component({
    templateUrl: "./cos-edit-virtual-machines.component.html"})

export class CosEditvirtualMachinesComponent implements OnInit, OnChanges {

    virtualMachinesForm: FormGroup;  
    virtualMachineData: VirtualMachines[];
    categoryStatus: boolean = false;
    Title: string;
    podId: number = 71;
    clusterId: number;
    updateId: number;
    filteredUsers: Observable<any>;
    virtualmachineCluster: VirtualMachines;
    
    constructor(
             
                public virtualMachineService: VirtualMachinesService,
                private dataService: DataTableSharedService,
                // public roleService: RoleService,
                // public auth: AuthHolderService,
                public formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
         
                    this.podId = this.route.parent.parent.parent.parent.snapshot.params.podId;
                   
        // Form Title
        this.Title = 'Update Virtual Machine';//Object.keys(this.virtualmachineCluster).length === 0 ? "addVirtualMachine" : "Edit Virtual Machine";

        // this.updateId = this.virtualmachineCluster.id;
        
        // Form Data
        this.virtualMachinesForm = this.formBuilder.group({
            virtualMachineName: [this.virtualmachineCluster && this.virtualmachineCluster.virtualMachineName],
            osVersion: [this.virtualmachineCluster && this.virtualmachineCluster.osVersion],
            ipAddress: [this.virtualmachineCluster && this.virtualmachineCluster.ipAddress],
            virtualNetwork: [this.virtualmachineCluster && this.virtualmachineCluster.virtualNetwork],
            cpu: [this.virtualmachineCluster && this.virtualmachineCluster.cpu],
            ram: [this.virtualmachineCluster && this.virtualmachineCluster.ram],
            storage: [this.virtualmachineCluster && this.virtualmachineCluster.storage],
            customerName:[this.virtualmachineCluster && this.virtualmachineCluster.customerName]
        });
        // this.clusterId = data.id;
        
        // console.log(this.hardwareCluster.id);
        
    }

   ngOnInit() {

    this.route.params
    .subscribe(param => {
      console.log(param);
      console.log(this.dataService.getRowData);
      
      if (this.dataService.getRowData && param.id) {
        this.updateId = this.dataService.getRowData; 
        this.virtualMachinesForm.patchValue(this.dataService.getRowData);
      }
    }); 

    this.filteredUsers = this.getSearchedList('customerName');
   }

//    displayFn(user: any) {
//     let self = this;
//     return (user) => {
//         if (user) { 
//             self.virtualMachinesForm.get('customerName').setValue(user.privateDomainName);    
//             return user.custName; 
//         }
//     }
//   }


   getSearchedList(type){
    return this.virtualMachinesForm.get(type).valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value =>{ 
          if(value.custName){
              value = value.custName
          }
          if(value == ""){
              return [];
          }
          let searchCustomer = {}
          searchCustomer[type] = value;
          return this.virtualMachineService.searchCustomer(searchCustomer).pipe(
          map(response => {
           return response.data
         },catchError(error => {
             console.log(error);
              return []
         })),
         catchError(error => {
              console.log(error);
              return []
          }),
         tap((response: any) => response),
      )
      }
      ));
  }

   ngOnChanges() {
    
   }
  
    saveVirtualmachine() { 

   
       let form = this.virtualMachinesForm.value;
        console.log(this.updateId, "update Id");
        
       if(this.updateId) {
        form['id'] = this.updateId;
        this.virtualMachineService.updateVirtualmachine(form).subscribe(data=> {
           console.log("Machine updated",data);
        });
       } else {
             // console.log(createUpdateRequest);
        this.virtualMachineService.saveVirtualmachine(form).subscribe(data=> {
            // if(data==true) {
            //     this.virtualMachineService.getReloaddata(true);
            // }
            
          });
       }
       
        
  
    

    }

  
}