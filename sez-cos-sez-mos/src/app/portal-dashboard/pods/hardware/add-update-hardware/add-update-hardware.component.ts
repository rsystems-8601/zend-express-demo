import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hardware, CpuType, OwnerType } from 'src/app/models/hardware.model';

import { Datacenter, Pods } from '../../../../models/cos-common.model';
import { MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { HardwareService } from '../services/hardware.service';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_DATE_FORMATS, AppDateAdapter } from '../../pod-list/date.adapter';
import { DataTableSharedService } from 'src/app/shared/data-table/data-table.service';



@Component({
  selector: 'app-add-update-hardware',
  templateUrl: './add-update-hardware.component.html',
  styleUrls: ['./add-update-hardware.component.scss'],
  providers: [
   { provide: DateAdapter, useClass: AppDateAdapter},
   { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS  }
   ]
})
export class AddhardwareComponent implements OnInit  {

   editjobForm: FormGroup; 
   
   ft: FormGroup;
   sd: FormGroup;
   th: FormGroup;
   fr:FormGroup;
 
   viewButton: boolean = false;
   datacenterData: Datacenter[];
   podData: Pods[];

  hardwareFormSaveUpdate: any;
  datacetnerIdeach: number;
  datacenterName: any;
  podName: any;

  datacenterId:number;
  podId: number;
//   typesArray: string[] = ["switch", "server", "array"];
   cpuCountArray:CpuType;
   ownerTypeArray:OwnerType;
   typeofAction: string;
   Isprotected:any;
   switchTypeArray: any;
   switchTypeStatus: boolean;
   ownerTypeSatatus: boolean = false;
   cpuTypeSatatus:boolean = false;
   hardwareTypeArray: any;
   netDate: string;
   
 
   
   constructor(@Inject(MAT_DIALOG_DATA)  public hardwareModel:Hardware,
               public dialogRef: MatDialogRef<AddhardwareComponent>,
               public hardwareService: HardwareService,
               public formBuilder: FormBuilder, 
               private dataTableService: DataTableSharedService,
               private activatedRoute: ActivatedRoute,
               private router: Router
               ) {

                  
                  // Datacenter and PodId will be get from url
                  this.podId = this.activatedRoute.parent.parent.parent.parent.snapshot.params.podId;
                  // console.log("##",this.podId);   

                  this.datacenterId = this.activatedRoute.parent.parent.parent.parent.snapshot.params.id;
                  // console.log("***",this.datacenterId);

                  // Perticular  Data center details
                  this.hardwareService.getDatacenterdetails(this.datacenterId).subscribe(datacentervalue=> {
                     this.datacenterName = datacentervalue.name;
                  });
                  // Perticular Pod details
                  this.hardwareService.getPoddetails(this.podId).subscribe(podlistValue=> {
                  this.podName = podlistValue.podName;
                  });
                  // Get CPU type
                  this.hardwareService.getCpuType().subscribe((cpuTypeValue:CpuType)=> {
                     this.cpuCountArray = cpuTypeValue;
                  });

                  // Get Owner Type
                  this.hardwareService.getOwnerType().subscribe((ownerTypeValue:OwnerType)=> {
                     this.ownerTypeArray  = ownerTypeValue;
                  });

                  //  Get Hardware Type
                  this.hardwareService.getHardwareType().subscribe(hardwareTypeValue=> {
                     this.hardwareTypeArray  = hardwareTypeValue;
                  });

                  


                  console.log(this.dataTableService.getRowData);

                  
                  

                  // if(this.dataTableService.getRowData)
                  // console.log(this.dataTableService.getRowData, "getDataforupdate");
                  
                  

   }

  

   ngOnInit() {
      
                const hardwareinputText = '^[a-zA-Z0-9 ]*$'; 
                const alphanumericText = '^[a-zA-Z0-9]{0,32}$';
                 // Form Groups
                  this.ft = this.formBuilder.group({
                     name: [this.hardwareModel && this.hardwareModel.name,[Validators.required, Validators.pattern(hardwareinputText)]],
                     make: [this.hardwareModel && this.hardwareModel.make, [Validators.required, Validators.pattern(hardwareinputText)]],
                     model: [this.hardwareModel && this.hardwareModel.model, [Validators.required, Validators.pattern(hardwareinputText)]],
                     serialNumber: [this.hardwareModel && this.hardwareModel.serialNumber, [Validators.required, Validators.pattern(alphanumericText)]],
                     type:[this.hardwareModel && this.hardwareModel.type, [Validators.required]],
                     switchType:[this.hardwareModel && this.hardwareModel.switchType]
                  });

                  this.sd  = this.formBuilder.group({
                     // Switch type
                     totalPorts: [this.hardwareModel && this.hardwareModel.totalPorts],
                     usedPorts: [this.hardwareModel && this.hardwareModel.usedPorts],

                     //Server Type
                     ipAddress: [this.hardwareModel && this.hardwareModel.ipAddress],
                     ram: [this.hardwareModel && this.hardwareModel.ram],
                     cpuCount: [this.hardwareModel && this.hardwareModel.cpuCount],
                     cpuSpeed: [this.hardwareModel && this.hardwareModel.cpuSpeed],
                     driveSize:[this.hardwareModel && this.hardwareModel.driveSize],
                     drives:[this.hardwareModel && this.hardwareModel.type],
                     username:[this.hardwareModel && this.hardwareModel.userName],
                     password:[this.hardwareModel && this.hardwareModel.password],
                     salesLeaseNumber:[this.hardwareModel && this.hardwareModel.salesLeaseNumber],
                     dateOfPurchase:[this.hardwareModel && this.hardwareModel.dateOfPurchase],
                     chasisId:[this.hardwareModel && this.hardwareModel.chasisId],
                     hwClusterNotationID:[this.hardwareModel && this.hardwareModel.hwClusterNotationID],
                     hwClusterId:[this.hardwareModel && this.hardwareModel.hwClusterId],
                     cpuName:[this.hardwareModel && this.hardwareModel.cpuName],
                     cpuTypeId: [this.hardwareModel && this.hardwareModel.cpuTypeId],
                     cores:[this.hardwareModel && this.hardwareModel.cores],
                     
                    //Array Type
                     lastSnapshot:[this.hardwareModel && this.hardwareModel.lastSnapshot],
                     protected:[this.hardwareModel && this.hardwareModel.protected],
                     virtualNetwork:[this.hardwareModel && this.hardwareModel.virtualNetwork],
                     volumeName:[this.hardwareModel && this.hardwareModel.volumeName]
                  });

                  this.th = this.formBuilder.group({
                  });

                  this.fr = this.formBuilder.group({
                     ownerId: [this.hardwareModel && this.hardwareModel.ownerId],
                     ownerName: [this.hardwareModel && this.hardwareModel.ownerName, [Validators.required]],
                     contractTerm:[this.hardwareModel && this.hardwareModel.contractTerm, [Validators.required]],
                     contractStartDate: [this.hardwareModel && this.hardwareModel.contractStartDate, [Validators.required]],
                     contractEndDate: [this.hardwareModel && this.hardwareModel.contractEndDate, [Validators.required]],
                     warrantyStartDate: [this.hardwareModel && this.hardwareModel.warrantyStartDate, [Validators.required]],
                     warrantyEndDate: [this.hardwareModel && this.hardwareModel.warrantyEndDate, [Validators.required]],
                  });

                  this.hardwareService.getSwitchType().subscribe((switchTypeValue:any)=> {
                     this.switchTypeArray  = switchTypeValue;
                  });

                  // Set Owner Name
                  this.fr.get('ownerName').valueChanges.subscribe(() => {
                     this.fr.get('ownerId').reset();
                     this.ownerTypeSatatus = false;
                     setTimeout(()=> {
                        console.log(this.fr.value);
                     }, 1000);
                  });

                  // Set CPU Name
                  this.sd.get('cpuName').valueChanges.subscribe(() => {
                     this.sd.get('cpuTypeId').reset();
                     this.cpuTypeSatatus  = false;
                     setTimeout(()=> {
                        console.log(this.sd.value);
                     }, 1000);
                  });

                  // Isproted field to show
                  this.Isprotected = { "Yes": true, "No": false };

                 // Route to get all data
                 this.activatedRoute.params
                 .subscribe( param => {  
                   
                    if(param.id){
                       if(this.dataTableService.getRowData) {
                         console.log(this.dataTableService.getRowData, "My data");
                         
                          if(this.dataTableService.getRowData.type=='SWITCHES') {
                             this.switchTypeStatus = true;
                             this.changeType('SWITCHES');
                          } 

                         
                          
                          this.ft.patchValue(this.dataTableService.getRowData);
                          this.sd.patchValue(this.dataTableService.getRowData);
                          this.fr.patchValue(this.dataTableService.getRowData);

                          if(this.dataTableService.getRowData.type!='SWITCHES') {
                           let contractStartDate = this.dataTableService.getRowData.contractStartDate.split("/");
                           let contractEndDate = this.dataTableService.getRowData.contractEndDate.split("/");
                           let warrantyStartDate = this.dataTableService.getRowData.warrantyStartDate.split("/");
                           let warrantyEndDate = this.dataTableService.getRowData.warrantyEndDate.split("/");
 
                           this.fr.get('contractStartDate').patchValue(new Date(contractStartDate[0]+"/"+contractStartDate[1]+"/"+contractStartDate[2]));
                           this.fr.get('contractEndDate').patchValue(new Date(contractEndDate[0]+"/"+contractEndDate[1]+"/"+contractEndDate[2]));
                           this.fr.get('warrantyStartDate').patchValue(new Date(warrantyStartDate[0]+"/"+warrantyStartDate[1]+"/"+warrantyStartDate[2]));
                           this.fr.get('warrantyEndDate').patchValue(new Date(warrantyEndDate[0]+"/"+warrantyEndDate[1]+"/"+warrantyEndDate[2]));
                          }

            
                       }else{
                          this.router.navigate(['../'],{
                             relativeTo:this.activatedRoute
                          })
                       }
                    }else{
                       console.log('Create');
                    }
                    
                 });   
   }

   createHardware() {
      
   }



   changeType(eventType:any) {
      // console.log(eventType);
      const numberOnly1 = '^[0-9]*$';
      const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
      const passWordreg = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';
      const alphanumericText1 = '^[a-zA-Z0-9]{0,32}$';
      if(eventType=='SWITCHES') {

         this.typeofAction = eventType;
         this.switchTypeStatus = true;

          // Get Owner Type
         
         this.ft.get('switchType').setValidators([Validators.required]);
         this.sd.get('totalPorts').setValidators([Validators.required, Validators.maxLength(2), Validators.pattern(numberOnly1)]);
         this.sd.get('usedPorts').setValidators([Validators.required, Validators.maxLength(2), Validators.pattern(numberOnly1)]);

      } else if(eventType=='SERVERS') {

         this.typeofAction = eventType;
         this.switchTypeStatus = false;
         // Server
         this.sd.get('ram').setValidators([Validators.required, Validators.maxLength(3), Validators.pattern(numberOnly1)]);
         this.sd.get('cpuTypeId').setValidators([Validators.required]);
         this.sd.get('cpuName').setValidators([Validators.required, Validators.pattern(alphanumericText1)]);
         this.sd.get('cpuCount').setValidators([Validators.required, Validators.pattern(numberOnly1)]);
         this.sd.get('hwClusterNotationID').setValidators([Validators.required]);
         this.sd.get('hwClusterId').setValidators([Validators.required]);
         this.sd.get('chasisId').setValidators([Validators.required]);
         this.sd.get('dateOfPurchase').setValidators([Validators.required]);
         this.sd.get('salesLeaseNumber').setValidators([Validators.required, Validators.pattern(numberOnly1)]);
         this.sd.get('cores').setValidators([Validators.required, Validators.pattern(numberOnly1)]);
         this.sd.get('ipAddress').setValidators([Validators.required, Validators.pattern(ipPattern)]);
         this.sd.get('driveSize').setValidators([Validators.required, Validators.pattern(numberOnly1)]);
         this.sd.get('cpuSpeed').setValidators([Validators.required]);
         this.sd.get('username').setValidators([Validators.required]);
         this.sd.get('password').setValidators([Validators.required, Validators.pattern(passWordreg)]);
         this.ft.get('switchType').setValidators(null);

      }
      else if(eventType=='Array') {
         const alphanumericText2 = '^[a-zA-Z0-9]{0,32}$';
         this.typeofAction = eventType;
         this.switchTypeStatus = false;
         // Server
         this.sd.get('ram').setValidators([Validators.required, Validators.maxLength(3), Validators.pattern(numberOnly1)]);
         this.sd.get('cpuTypeId').setValidators([Validators.required]);
         this.sd.get('cpuName').setValidators([Validators.required, Validators.pattern(alphanumericText1)]);
         this.sd.get('cpuCount').setValidators([Validators.required, Validators.pattern(numberOnly1)]);
         this.sd.get('hwClusterNotationID').setValidators([Validators.required]);
         this.sd.get('hwClusterId').setValidators([Validators.required]);
         this.sd.get('chasisId').setValidators([Validators.required]);
         this.sd.get('dateOfPurchase').setValidators([Validators.required]);
         this.sd.get('salesLeaseNumber').setValidators([Validators.required, Validators.pattern(numberOnly1)]);
         this.sd.get('cores').setValidators([Validators.required, Validators.pattern(numberOnly1)]);
         this.sd.get('ipAddress').setValidators([Validators.required, Validators.pattern(ipPattern)]);
         this.sd.get('driveSize').setValidators([Validators.required, Validators.pattern(numberOnly1)]);
         this.sd.get('cpuSpeed').setValidators([Validators.required]);
         this.sd.get('username').setValidators([Validators.required]);
         this.sd.get('password').setValidators([Validators.required, Validators.pattern(passWordreg)]);
         // Array
         this.sd.get('lastSnapshot').setValidators([Validators.required]);
         this.sd.get('protected').setValidators([Validators.required]);
         this.sd.get('volumeName').setValidators([Validators.required, Validators.pattern(alphanumericText2)]);
         this.sd.get('virtualNetwork').setValidators([Validators.required]);
         this.ft.get('switchType').setValidators(null);
      }
       else {
         this.typeofAction = null;
         this.switchTypeStatus = false;
         this.ft.get('switchType').setValidators(null);
         this.sd.get('usedPorts').setValidators(null);
         this.sd.get('totalPorts').setValidators(null);
         this.sd.get('ram').setValidators(null);
         this.sd.get('cpuTypeId').setValidators(null);
         this.sd.get('cpuName').setValidators(null);
         this.sd.get('cpuCount').setValidators(null);
         this.sd.get('hwClusterNotationID').setValidators(null);
         this.sd.get('hwClusterId').setValidators(null);
         this.sd.get('chasisId').setValidators(null);
         this.sd.get('dateOfPurchase').setValidators(null);
         this.sd.get('salesLeaseNumber').setValidators(null);
         this.sd.get('cores').setValidators(null);
         this.sd.get('ipAddress').setValidators(null);
         this.sd.get('driveSize').setValidators(null);
         this.sd.get('cpuSpeed').setValidators(null);
         this.sd.get('username').setValidators(null);
         this.sd.get('password').setValidators(null);
         // Array
         this.sd.get('lastSnapshot').setValidators(null);
         this.sd.get('protected').setValidators(null);
         this.sd.get('volumeName').setValidators(null);
         this.sd.get('virtualNetwork').setValidators(null);
      }

     
      this.sd.get('totalPorts').updateValueAndValidity();
      this.ft.get('switchType').updateValueAndValidity();
      this.sd.get('usedPorts').updateValueAndValidity();
      this.sd.get('usedPorts').updateValueAndValidity();
      this.sd.get('totalPorts').updateValueAndValidity();
      this.sd.get('ram').updateValueAndValidity();
      this.sd.get('cpuTypeId').updateValueAndValidity();
      this.sd.get('cpuName').updateValueAndValidity();
      this.sd.get('cpuCount').updateValueAndValidity();
      this.sd.get('hwClusterNotationID').updateValueAndValidity();
      this.sd.get('hwClusterId').updateValueAndValidity();
      this.sd.get('chasisId').updateValueAndValidity();
      this.sd.get('dateOfPurchase').updateValueAndValidity();
      this.sd.get('salesLeaseNumber').updateValueAndValidity();
      this.sd.get('cores').updateValueAndValidity();
      this.sd.get('ipAddress').updateValueAndValidity();
      this.sd.get('driveSize').updateValueAndValidity();
      this.sd.get('cpuSpeed').updateValueAndValidity();
      this.sd.get('username').updateValueAndValidity();
      this.sd.get('password').updateValueAndValidity();
      // Array
      this.sd.get('lastSnapshot').updateValueAndValidity();
      this.sd.get('protected').updateValueAndValidity();
      this.sd.get('volumeName').updateValueAndValidity();
      this.sd.get('virtualNetwork').updateValueAndValidity();
      
   }


   numberOnlyType(event:any) {
      const pattern = /[0-9\+\-\. ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
         event.preventDefault();
      }
   }

   // Owner To select in combobox
   selectOwnerType(ownerType){
      this.fr.get('ownerName').setValue(ownerType.name);
      this.fr.get('ownerId').setValue(ownerType.id);
      setTimeout(()=>{
         console.log(this.fr.value);
      },1000)
   }

   openOwnerTypelist() {
      this.ownerTypeSatatus = !this.ownerTypeSatatus;
   }

  
   // CPU To select in combobox
   selectCPuType(cpuType) {
      this.sd.get('cpuName').setValue(cpuType.name);
      this.sd.get('cpuTypeId').setValue(cpuType.id);
      setTimeout(()=>{
         console.log(this.sd.value);
      }, 1000)
   }

   openCpuTypelist() {
      this.cpuTypeSatatus = !this.cpuTypeSatatus;
   }


    get name() { return this.ft.get('name') };
    get make() { return this.ft.get('make') };
    get model() { return this.ft.get('model') };
    get serialNumber() { return this.ft.get('serialNumber')};
    get ipAddress() { return this.sd.get('ipAddress')};
    get ram() { return this.sd.get('ram')};
    get cpuCores() { return this.sd.get('cpuCores')};
    get driveCount() { return this.sd.get('driveCount')};
    get totalPorts() { return this.sd.get('totalPorts') };
    get usedPorts() { return this.sd.get('usedPorts') };
    get salesLeaseNumber() { return this.sd.get('salesLeaseNumber') };
    get cores() { return this.sd.get('cores') };
    get driveSize() { return this.sd.get('driveSize') };
    get password() { return this.sd.get('password') };
    get cpuCount() { return this.sd.get('cpuCount') };
    
    
    
 
    saveHardwareData() {    

      this.hardwareFormSaveUpdate = {...this.fr.value, ...this.ft.value, ...this.sd.value };

      this.hardwareFormSaveUpdate['podId'] = this.podId;
   

      console.log(this.hardwareFormSaveUpdate);

      if(this.dataTableService.getRowData) {
         
         this.hardwareFormSaveUpdate['action'] = "EDIT_ARRAY";
         this.hardwareFormSaveUpdate['id'] = this.dataTableService.getRowData.id;
         this.hardwareService.updateHardware(this.hardwareFormSaveUpdate).subscribe(data=> {
            console.log(data, "data after update");
         })
      } else {
         this.hardwareFormSaveUpdate['action'] = "ADD_SWITCH";
         this.hardwareService.saveHardware(this.hardwareFormSaveUpdate).subscribe(data=> {
            console.log(data, "data after save");
         })
      }
      
      
       
   }

   
}
