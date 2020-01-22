import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


// Custom models and services
import { map } from 'rxjs/operators';

import { CosEditPodTorswitchesComponent } from '../cos-save-edit-pod-toswitches/cos-edit-pod.component';
import { CosEditPodtengbswitchesComponent } from '../cos-save-edit-pod-tengbswitches/cos-edit-pod-tengbswitches.component';
import { CosEditPodipmiswitchesComponent } from '../cos-save-edit-pod-ipmiswitches/cos-edit-pod-ipmiswitches.component';
import { CosEditPodserversComponent } from '../cos-save-edit-pod-servers/cos-edit-pod-servers.component';
import { CosEditPodstorageComponent } from '../cos-save-edit-pod-storage/cos-edit-pod-storage.component';
import { PrivateVlanfilterdata } from 'src/app/models/private-vlan.model';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Datacenter, Pods } from 'src/app/models/cos-common.model';
import { Poddetails } from 'src/app/models/poddetails.model';
import { PodServicesService } from '../../pod-services.service';
import { CoscommonService } from 'src/app/portal-dashboard/datacenter/services/cos-common.service';


@Component({
  templateUrl: './cos-pod-management.component.html',
  styleUrls: ["./cos-pod-management.component.less"]
})
export class CosPodManagementComponent implements OnInit, OnDestroy {

  // authSubordinateRoles: Role[];
  tableData: PrivateVlanfilterdata[];
  pageTitle:string = "Pod Update";
  // Dynamic Title and Add button
  titleComponent = "podManagement";
  pageLength:number;
  pageSize:number;
  eventValue: any;
  pageIndex: number;
  recordPage: number;
  cutomerContract: string;
  showTablestatus:boolean;
  podcreateForm: FormGroup;

  dataCenters: Datacenter[];
  podsData: Pods[];
  podcreateStatus: boolean = false;

  customvalidStatus:boolean = false;
  statusMsg: boolean = false;
  datacentereachId: number = 72;
  podId:number;
  // podId: number = 71;

  // poddetails: Poddetails;
  hiddenTable: boolean = true;
  networkTypeArr:string[] = ["LEGACY","NSX_T","NSX_V","UAG"];
  networktypeBool: boolean = false;
  checboxRealvalue: any;
  myArr: Poddetails[];
  markchecktoNetwork: boolean = true;
  selected:boolean= true;
  filledValue: string;
  showdataandPod: boolean;
  backbtn: boolean;
  // datacentereachId = 72;


    // "LEGACY","NSX-T","NSX-V","UAG"];


  // podName:string;

  constructor(@Inject(MAT_DIALOG_DATA) public poddetails: Poddetails, public podsService: PodServicesService,

              // public roleService: RoleService,
              // public auth: AuthHolderService,
               private dialog: MatDialog, public formBuilder: FormBuilder,
               private _coscommonService: CoscommonService) {



              // Default data center list
              this._coscommonService.getDatacenterList().subscribe((data: Datacenter[])=> {
                this.dataCenters = data;
                // console.log(data);

              });



              // Push torswitches data
              this.podsService.sharetorInfo.subscribe((data) => {
                (this.podcreateForm.get('torSwitches') as FormArray).push(this.formBuilder.group(data));
              });

              // Push 10GBswitches data
              this.podsService.sharetengbInfo.subscribe((data) => {
                (this.podcreateForm.get('tenGBSwitches') as FormArray).push(this.formBuilder.group(data));
              });

              // Push IPMI switches data
              this.podsService.shareipmiInfo.subscribe((data) => {
                (this.podcreateForm.get('iPMISwitches') as FormArray).push(this.formBuilder.group(data));
              });

              // Push servers data
              this.podsService.shareserverInfo.subscribe((data) => {
                (this.podcreateForm.get('servers') as FormArray).push(this.formBuilder.group(data));
              });

               // Push storageCluster data
               this.podsService.sharestorageInfo.subscribe((data) => {
                (this.podcreateForm.get('storageCluster') as FormArray).push(this.formBuilder.group(data));
              });


              this.podId  =  poddetails.id;

              // console.log(poddetails);


}

  ngOnInit() {
    this.podsInfo();
    this.dataCenterinfo()
    this.fullFormPod();

    this.backbtn = false;
    // this.showdataandPod = true;
  }

  fullFormPod() {
    this.podcreateForm = this.formBuilder.group({
      podName: [this.poddetails && this.poddetails.podName],
      podNotationId: [this.poddetails && this.poddetails.podNotationId],
      domain: [this.poddetails && this.poddetails.domain],
      rackUnits: [this.poddetails && this.poddetails.rackUnits],
      datacenterSlot: [this.poddetails && this.poddetails.datacenterSlot],
      additionalInfo: [this.poddetails && this.poddetails.additionalInfo],
      managementUrl: [this.poddetails && this.poddetails.managementUrl],
      environmentType: [this.poddetails && this.poddetails.environmentType],
      dataCenterId: [this.poddetails && this.poddetails.dataCenterId],
      vCenter: [this.poddetails && this.poddetails.vCenter && this.poddetails.vCenter.name],
      version: [this.poddetails && this.poddetails.vCenter && this.poddetails.vCenter.version],
      url: [this.poddetails && this.poddetails.vCenter && this.poddetails.vCenter.url],
      hwClustersCount: [this.poddetails && this.poddetails.hwClustersCount],
      maximumHwClusters:  [this.poddetails && this.poddetails.maximumHwClusters],
      torSwitchesCount: [this.poddetails && this.poddetails.torSwitchesCount],
      maxTorSwitches: [this.poddetails && this.poddetails.maxTorSwitches],
      tenGBSwitchesCount: [this.poddetails && this.poddetails.tenGBSwitchesCount],
      max10GBSwitches: [this.poddetails && this.poddetails.max10GBSwitches],
      iPMISwitchesCount: [this.poddetails && this.poddetails.iPMISwitchesCount],
      maxIPMISwitches: [this.poddetails && this.poddetails.maxIPMISwitches],
      serversCount: [this.poddetails && this.poddetails.serversCount],
      maxServers: [this.poddetails && this.poddetails.maxServers],
      storageClustersCount: [this.poddetails && this.poddetails.storageClustersCount],
      maxStorageClusters: [this.poddetails && this.poddetails.maxStorageClusters],

      privateIP: [this.poddetails && this.poddetails.vCenter && this.poddetails.vCenter.privateIP],
      torSwitches: this.formBuilder.array([]),
      tenGBSwitches: this.formBuilder.array([]),
      iPMISwitches:this.formBuilder.array([]),
      servers:this.formBuilder.array([]),
      storageCluster:this.formBuilder.array([]),
      networkType: this.formBuilder.group({}),
  });



    let networkGroup = this.podcreateForm.get('networkType') as FormGroup;
    this.networkTypeArr.forEach(item => {
      // this.podcreateForm.controls('networkType').addControl(item, new FormControl(true));
      networkGroup.addControl(item, new FormControl(false));
    });

    networkGroup.get("LEGACY").patchValue(true);




  }




  openPodfullform() {
    this.showdataandPod = true;
    this.backbtn = true;
    this.podcreateForm.reset();
    this.fullFormPod();
  }

  backPodform() {
    this.backbtn = false;
    this.showdataandPod = false;
  }


  // Torswitches popup
  opentorSwitchedDialog(data?:any): void {
    const dialogRef = this.dialog.open(CosEditPodTorswitchesComponent, {
      width: '800px',
      data: data,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }


  // 10gp switches popup
  opentengbSwitchedDialog(dataten?:any): void {
    const dialogRef = this.dialog.open(CosEditPodtengbswitchesComponent, {
      width: '800px',
      data: dataten,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

   // IPMI switches popup
   openipmiSwitchedDialog(dataipmi?:any): void {
    const dialogRef = this.dialog.open(CosEditPodipmiswitchesComponent, {
      width: '800px',
      data: dataipmi,
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

     // Servers popup
     openServersDialog(dataserver?:any): void {
      const dialogRef = this.dialog.open(CosEditPodserversComponent, {
        width: '800px',
        data: dataserver,
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }

       // Servers popup
       openStorageDialog(datastorage?:any): void {
        const dialogRef = this.dialog.open(CosEditPodstorageComponent, {
          width: '800px',
          data: datastorage,
        });
        dialogRef.afterClosed().subscribe(result => {
        });
      }



  checkValue(value) {
    console.log(value);
  }


   // Get pod list on the basis of datacenter selected Id
  //  datacenterId:number  | This would be dynamic in future

  dataCenterinfo() {

    this.podsService.getPodList(this.datacentereachId).subscribe((data: Pods[])=> {
      this.podsData = data;
    })
  }

 // Get pod list and show form


//  podId:number | This would be dynamic in future

 podsInfo(){
      if(this.datacentereachId!=null || this.datacentereachId!=undefined) {
          if(this.podId!=null || this.podId!=undefined) {
            this.podsService.getPodDetails(this.podId).subscribe((data) => {
              this.poddetails = <Poddetails>data;

              let vCenter = this.poddetails.vCenter.name;
              this.poddetails = { ...this.poddetails, ...this.poddetails.vCenter };

              this.podcreateForm.patchValue(this.poddetails);

              this.podcreateForm.get('vCenter').setValue(vCenter);

              // Get Torswitches info
              let podNotationnumberLength = this.poddetails.torSwitches.length+1;
              let podNotationnumber = this.poddetails.podNotationId;
              localStorage.setItem("podnotationid", podNotationnumber+"+"+podNotationnumberLength);

              this.poddetails.torSwitches.map( rec => {
                  (this.podcreateForm.get('torSwitches') as FormArray).push(this.formBuilder.group({
                    make: [rec.make],
                    model: [rec.model],
                    name: [rec.name],
                    notationId: [rec.notationId],
                    ownerName: [rec.ownerName],
                    serialNumber: [rec.serialNumber],
                    totalPorts: [rec.totalPorts],
                    usedPorts: [rec.usedPorts],
                }))
              });


              //Get 10GB Switches

              let podNotationnumberLength10gb = this.poddetails.tenGBSwitches.length+1;
              let podNotationnumbertenGb = this.poddetails.podNotationId;
              localStorage.setItem("podnotationidfortenGb", podNotationnumbertenGb+"+"+podNotationnumberLength10gb);

              this.poddetails.tenGBSwitches.map( rectwo => {
                (this.podcreateForm.get('tenGBSwitches') as FormArray).push(this.formBuilder.group({
                  make: [rectwo.make],
                  model: [rectwo.model],
                  name: [rectwo.name],
                  notationId: [rectwo.notationId],
                  ownerName: [rectwo.ownerName],
                  serialNumber: [rectwo.serialNumber],
                  totalPorts: [rectwo.totalPorts],
                  usedPorts: [rectwo.usedPorts],
              }))
            })


                 //Get IPMI Switches

                 let podNotationnumberLengthipmi = this.poddetails.iPMISwitches.length+1;
                 let podNotationnumberipmi = this.poddetails.podNotationId;
                 localStorage.setItem("podnotationidforipmi", podNotationnumberipmi+"+"+podNotationnumberLengthipmi);

                 this.poddetails.iPMISwitches.map( recthree => {
                   (this.podcreateForm.get('iPMISwitches') as FormArray).push(this.formBuilder.group({
                     make: [recthree.make],
                     model: [recthree.model],
                     name: [recthree.name],
                     notationId: [recthree.notationId],
                     ownerName: [recthree.ownerName],
                     serialNumber: [recthree.serialNumber],
                     totalPorts: [recthree.totalPorts],
                     usedPorts: [recthree.usedPorts],
                 }))
            });

            // Load Servers data
            this.poddetails.servers.map( recfour => {
              (this.podcreateForm.get('servers') as FormArray).push(this.formBuilder.group({
                make: [recfour.make],
                model: [recfour.model],
                name: [recfour.name],
                ram: [recfour.ram],
                ownerName: [recfour.ownerName],
                serialNumber: [recfour.serialNumber],
                cpuName: [recfour.cpuName],
                cores: [recfour.cores],
                drives: [recfour.drives],
                cpuTypeId: [recfour.cpuTypeId],
                dateOfPurchase: [recfour.dateOfPurchase],
                warrantyPeriod:[recfour.warrantyPeriod],
                salesLeaseNumber:[recfour.salesLeaseNumber],
                userName: [recfour.userName],
                password: [recfour.password]





               }))
           });

            // Load Storage data
            this.poddetails.storageCluster.map( recfive => {
              (this.podcreateForm.get('storageCluster') as FormArray).push(this.formBuilder.group({
                make: [recfive.make],
                model: [recfive.model],
                name: [recfive.name],
                ram: [recfive.ram],
                ownerName: [recfive.ownerName],
                serialNumber: [recfive.serialNumber],
                cpuName: [recfive.cpuName],
                cores: [recfive.cores],
                ownerId:[recfive.ownerId],
                drives: [recfive.drives],
                cpuTypeId: [recfive.cpuTypeId],
                dateOfPurchase: [recfive.dateOfPurchase],
                warrantyPeriod:[recfive.warrantyPeriod],
                salesLeaseNumber:[recfive.salesLeaseNumber],
                userName: [recfive.userName],
                password: [recfive.password]


               }))
           });





          });

            this.hiddenTable = false;

            this.showdataandPod = true;
            this.showTablestatus = true;
          } else {
            this.showTablestatus = false

          }
          this.podId = this.podId;

      } else {
        this.showTablestatus = false

      }
    }

    // Get Torswitches
    get getMydatatorswitches() {
      return this.podcreateForm.controls.torSwitches as FormArray;
    }

    // Get 10GB Switches
    get getMydata10Gbswitches() {
      return this.podcreateForm.controls.tenGBSwitches as FormArray;
    }

    // Get IPMI Switches
    get getMydataIPMIswitches() {
      return this.podcreateForm.controls.iPMISwitches as FormArray;
    }


     // Get Servers
     get getMydataServers() {
      return this.podcreateForm.controls.servers as FormArray;
    }

     // Get storageCluster
     get getMydataStorage() {
      return this.podcreateForm.controls.storageCluster as FormArray;
    }





   // Delete Torswitches
    deleteTor(index) {
      const controlone = <FormArray>this.podcreateForm.controls['torSwitches'];
      controlone.removeAt(index);
    }

    // Delete 10GB Switches
    deleteTengb(index) {
      const controlone = <FormArray>this.podcreateForm.controls['tenGBSwitches'];
      controlone.removeAt(index);
    }

    // Delete IPMI Switches
    deleteIpmi(index) {
      const controlone = <FormArray>this.podcreateForm.controls['iPMISwitches'];
      controlone.removeAt(index);
    }

     // Delete Server
     deleteServers(index) {
      const controlone = <FormArray>this.podcreateForm.controls['servers'];
      controlone.removeAt(index);
    }


     // Delete storageCluster
     deletestorageCluster(index) {
      const controlone = <FormArray>this.podcreateForm.controls['storageCluster'];
      controlone.removeAt(index);
    }






    savePoddata() {
      let form = this.podcreateForm.value;


      // console.log(Object.keys(form.networkType)) ;

      if(form.networkType) {
        for (const key in form.networkType) {
          if (form.networkType.hasOwnProperty(key)) {
            const element = form.networkType[key];
            if(element==true) {
              // console.log(key);
              form.networkType = [key];
            }
          }
        }
      }


      // console.log(this.podcreateForm.value);
      if(form.vCenter){
        form.vCenter = { id: this.poddetails.id, name: form.vCenter, url: form.url, version: form.version, privateIP: form.privateIP}
      }

      form = { ...form,  ...form.vCenter, ...form.networkType }

      console.log(form);
      // return false;
      this.podsService.savePoddata(form).subscribe(data=> {

      });

      localStorage.removeItem('podnotationid');
      localStorage.removeItem('podnotationidfortenGb');
      localStorage.removeItem('podnotationidforipmi');


    }

    closePopup() {
      this.dialog.closeAll();
    }

    get torSwitches(){
      return (<FormArray>this.podcreateForm.get('torSwitches')).controls
    }

    get tenGBSwitch(){
      return (<FormArray>this.podcreateForm.get('tenGBSwitches')).controls
    }

    get getiPMISwitches(){
      return (<FormArray>this.podcreateForm.get('iPMISwitches')).controls
    }

    get getServers(){
      return (<FormArray>this.podcreateForm.get('servers')).controls;
    }

    get storageCluster(){
      return (<FormArray>this.podcreateForm.get('storageCluster')).controls;
    }
    ngOnDestroy() {
      this.podsService.sharepddcData.unsubscribe();
    }



}
