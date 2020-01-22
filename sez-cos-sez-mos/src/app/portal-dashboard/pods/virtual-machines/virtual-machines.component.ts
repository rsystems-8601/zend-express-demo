import { Component, OnInit } from '@angular/core';

// import { CosEdithardwareclusterComponent } from './cos-save-edit-hardware-cluster/cos-edit-hardware-cluster.component';
// import { DeletedialogComponent } from './delete-hardware-cluster/deletedialog.component';

import { MatDialog } from '@angular/material';
import { VirtualMachines } from 'src/app/models/virtual-machines.model';
import { CosEditvirtualMachinesComponent } from './cos-save-edit-virtual-machines/cos-edit-virtual-machines.component';
import { VirtualMachinesService } from './virtual-machines.service';
import { DeletedialogComponent } from '../hardware-cluster/delete-hardware-cluster/deletedialog.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-virtual-machine',
  templateUrl: './virtual-machines.component.html',
  styleUrls: ['./virtual-machines.component.scss']
})
export class VirtualMachinesComponent implements OnInit {

  tableData: VirtualMachines;
  pageTitle:string = "Virtual Machines";

  // Define column for hardware management
  columnHeader = ["virtualMachineName","osVersion","virtualNetwork","ipAddress","cpu","ram","storage","customerName", "actions"];

  titleComponent = "Virtual Machines";
  pageLength:number;
  pageSize:number;
  eventValue: any;
  pageIndex: number;
  recordPage: number;
  cutomerContract: string;
  showTablestatus:boolean;
  podId: number;
  dataCenterId:number;
  updateComponent =  CosEditvirtualMachinesComponent;
  deleteDialog = DeletedialogComponent;
  addbutton = "addVirtualmachine"; 

 
 
   constructor(
    private virtualMachinesService: VirtualMachinesService, private dialog: MatDialog, private route: ActivatedRoute, private router: Router,
    ) { 
    
      // Load hardware clusters  
      this.virtualMachinesService.sharePoddata.subscribe(receiveddata => {  
        this.podId = receiveddata;
        this.reloadData();
    });

    this.virtualMachinesService.reloadDatarequest.subscribe(data=>{
      if(data) {
        this.reloadData();
        // alert('fdfdf')
      }
    })

    this.podId = this.route.parent.parent.parent.parent.snapshot.params.podId;
    this.dataCenterId = this.route.parent.parent.parent.parent.snapshot.params.id; 

    // console.log(this.podId);

    
   }
 
   ngOnInit() {
     this.reloadData();
   }

//    reloadData() {
//      this.virtualMachinesService.getAllVirtualMachines().subscribe(data=> {
//        console.log(data);
//      })
//     //  let podId:number = 71;
//     // this.virtualMachinesService.getvirtualMachinerData(podId)
//     // .pipe(map( data => data.hardwareClusterList))
//     // .subscribe( (data) => {
//     //   // console.log(data);
      
//     //   this.tableData = <VirtualMachines[]>data;
//     // });
// }


reloadData(indexValue?:number, recordPage?:number, fieldName?:any, fieldValue?:any ) {
       
  indexValue = (indexValue == null) ? 1 : indexValue;
  recordPage = (recordPage == null) ? 1 : recordPage;

  // this.podId  | will loads on this page 
  // this.dataCenterId  |  will load on this page

   

  //  console.log(fieldName, fieldValue);
   
  
  let orfilter = {};
  
  if(fieldName && fieldValue) {
    if(fieldName == "customerName") {
        orfilter = { "customer": { "name" : fieldValue } }
    } else if(fieldName == "cid") {
      orfilter = { "customer": { "custId" : fieldValue } }
    }  else if(fieldName == "dataCenter") {
      orfilter = { "pod": { "dataCenter.name" : fieldValue } }
    } else if(fieldName == "podName") {
      orfilter = { "pod": { "name" : fieldValue } }

    } 
    else {
      orfilter[fieldName] = fieldValue;
    }
 }

//  console.log(orfilter);
 


    // let dataPrivatelan = {
    //   "orfilter":orfilter,
    //   "andfilter":{
    //                 "pod":{ 
    //                         "id": podId,
    //                         "dataCenter.id":datacenterId
    //                       }
    //               },
    //   "ascSorting":["vlanId"],
    //   "descSorting":[],
    //   "pageNo": indexValue.toString(),
    //   "recordsPerPage": recordPage.toString()
    // }

    // console.log(dataPrivatelan);
    
   
    this.virtualMachinesService.getAllVirtualMachines().subscribe( (data) => { 
      
      // console.log(data);
      
      this.tableData = data;
      // this.pageLength = data.totalResult;
      // this.pageSize = data.filter.recordsPerPage;
    });
 
    
}



   // Paging for API
   pageChanged(event:any) {
    this.reloadData(event.pageIndex + 1, event.pageSize, null, null);
  }
  

  // Searched field and its value
  searchValues(eventValue:any) {
      let mydata  = eventValue.split('+');
      let fieldName = mydata[1];
      let fieldValue = mydata[0];
      this.reloadData(null,null, fieldName, fieldValue);
  }

showTable(eventVal) {
  if(eventVal) {
    this.showTablestatus = eventVal;
  } else {
    this.showTablestatus = false;
  }
}

ngOnDestroy() {
  //this.hardwareclusterService.sharePoddata.unsubscribe();
}
 
  

}
