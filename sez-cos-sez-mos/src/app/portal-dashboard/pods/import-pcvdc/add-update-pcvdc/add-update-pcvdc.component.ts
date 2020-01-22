import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Datacenter, Pods, HardwareClusterList, VrrpGroup } from '../../../../models/cos-common.model';
import { MAT_DIALOG_DATA, MatDialogRef, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { APP_DATE_FORMATS, AppDateAdapter } from '../../pod-list/date.adapter';
import { DataTableSharedService } from 'src/app/shared/data-table/data-table.service';
import { PcvdcService } from '../services/pcvdc.service';
import { Pcvdc, VirtualMachines, Pcvdccomponent } from 'src/app/models/pcvdc.model';


@Component({
  selector: 'app-add-update-pcvdc',
  templateUrl: './add-update-pcvdc.component.html',
  styleUrls: ['./add-update-pcvdc.component.scss'],
  providers: [
   { provide: DateAdapter, useClass: AppDateAdapter},
   { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS  }
   ]
})
export class AddpcvdcComponent implements OnInit  {

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
  pcvdcvms: FormArray;
  datacenterId:number;
  podId: number;
//   typesArray: string[] = ["switch", "server", "array"];
 
   typeofAction: string;
   Isprotected:any;
   switchTypeArray: any;
   switchTypeStatus: boolean;
   virtualMachineStatus: boolean = false;
   cpuTypeSatatus:boolean = false;
   hardwareTypeArray: any;
   netDate: string;
   vmListArray: VirtualMachines[];
   pcvdcListArray: Pcvdccomponent[];
   searchCustomer : FormControl = new FormControl();
   searchPublicIp : FormControl = new FormControl();

   customerList = <any>[];
   publicipList = <any>[];
   hardwareclusterList: HardwareClusterList;
   vrrpgroupList:VrrpGroup;
   
 
   
   constructor(@Inject(MAT_DIALOG_DATA)  public pcvdcModel:Pcvdc,
               public dialogRef: MatDialogRef<AddpcvdcComponent>,
               public pcvdcService: PcvdcService,
               public formBuilder: FormBuilder, 
               private dataTableService: DataTableSharedService,
               private activatedRoute: ActivatedRoute,
               private router: Router
               ) {

                  const lookupId = 5;
                  
                  // Datacenter and PodId will be get from url
                  this.podId = this.activatedRoute.parent.parent.parent.parent.snapshot.params.podId;
                  // console.log("##",this.podId);   

                  this.datacenterId = this.activatedRoute.parent.parent.parent.parent.snapshot.params.id;
                  // console.log("***",this.datacenterId);


                  // Get Owner Type
                  
                  this.pcvdcService.getVirtualmachine(60).subscribe((vmValues:VirtualMachines[])=> {
                     this.vmListArray  = vmValues;
                  });

                  this.pcvdcService.getPcvdccomponents(lookupId).subscribe((pcvdcValues:Pcvdccomponent[])=> {
                     this.pcvdcListArray  = pcvdcValues;
                  });

                  // Get VRRP group

                  this.pcvdcService.getHardwareVrrpgroup(this.podId).subscribe(vrrpHardware=>{
                     this.hardwareclusterList = vrrpHardware.hwClusters;
                     this.vrrpgroupList = vrrpHardware.vrrp;
                  });


   }

  

   ngOnInit() {
      
                 // Form Groups
                  this.ft = this.formBuilder.group({
                      pcvdcvms: this.formBuilder.array([this.addpcvdcArray()]),
                      product: new FormControl(null),
                      hwCluster: new FormControl(null, [Validators.required]),
                      vrrpGroupSynName: new FormControl(null, [Validators.required]),
                  });

                  this.sd  = this.formBuilder.group({
                  
                  });

                  this.th = this.formBuilder.group({
                     customerName: new FormControl(null, [Validators.required]),
                     custCID: new FormControl(null, [Validators.required]),
                  });

                  this.fr = this.formBuilder.group({
                 
                  });

                  // Customer Search
                  this.searchCustomer.valueChanges.subscribe(
                     name => {
                       if (name != '') {
                         const reqPayload = {"customerName":name};
                         this.pcvdcService.searchCustomer(reqPayload).subscribe(
                           data => {
                             this.customerList = data.data as any[];
                           
                         })
                       }
                   })  

                   // Public IP
                   this.searchPublicIp.valueChanges.subscribe(
                     publicip => {
                       if (publicip != '') {
                         const reqPayload = {"customerName":name};
                         this.pcvdcService.searchPublicIps(publicip).subscribe(
                           data => {
                             this.publicipList = data.data as any[];
                         })
                       }
                   }) 

             console.log(this.getControlsforpcvdc(), "gh");
                  

                   
   }

   getControlsforpcvdc() {
      return (this.ft.get('pcvdcvms') as FormArray).controls;
    }
   //  get getControlsforpcvdc() { return <FormArray>this.ft.get('pcvdcvms'); }

    onBlur(event:any) {
       if(event.target.value==null || event.target.value=='' ) {
        this.th.get('customerName').invalid;
        this.th.get("customerName").patchValue('');
       }  else {
         this.th.get("customerName").patchValue(event.target.value);
       }
    }

    selectCustomer(custId, custName) {
       
      if(custId && custName) {
        this.th.get("custCID").patchValue(custId);
        this.th.get("customerName").patchValue(custName);
      //   this.allocateIpForm.get("custId").patchValue(selectedCustomer["custId"]);
      //   this.allocateIpForm.get("custName").patchValue(selectedCustomer["custName"]);
      } else {
         this.th.get("customerName").patchValue('');
         this.th.get("custCID").patchValue('');
      } 
    }  

   addpcvdcArray() {
      return this.formBuilder.group({
         virtualMachineName: [this.pcvdcModel && this.pcvdcModel.virutalMachines && 
            this.pcvdcModel.virutalMachines.virtualMachineName, [Validators.required]],
        lookupName: [this.pcvdcModel && this.pcvdcModel.pcvdsComponents && 
         this.pcvdcModel.pcvdsComponents.lookupName, [Validators.required]] 
       })
    }

    addPcvdc() {
      this.pcvdcvms = this.ft.get('pcvdcvms') as FormArray;
      this.pcvdcvms.push(this.addpcvdcArray());
    }
 
    removePcvdc(i: number) {
      if(i>0) {
         const control = <FormArray>this.ft.controls['pcvdcvms'];
         control.removeAt(i);
      }
      
    }


    saveTest() {
      this.hardwareFormSaveUpdate = {...this.ft.value, ...this.sd.value };
      console.log(this.hardwareFormSaveUpdate);
    }
  

 
    saveHardwareData() {    

      this.hardwareFormSaveUpdate = {...this.fr.value, ...this.ft.value, ...this.sd.value };

      this.hardwareFormSaveUpdate['podId'] = this.podId;
   

      console.log(this.hardwareFormSaveUpdate);

      if(this.dataTableService.getRowData) {
         
         this.hardwareFormSaveUpdate['action'] = "EDIT_ARRAY";
         this.hardwareFormSaveUpdate['id'] = this.dataTableService.getRowData.id;
         this.pcvdcService.updateHardware(this.hardwareFormSaveUpdate).subscribe(data=> {
            console.log(data, "data after update");
         })
      } else {
         this.hardwareFormSaveUpdate['action'] = "ADD_SWITCH";
         
      }
      
      
       
   }

   
}
