import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';


// Custom models




import {  DeletedialogvlanComponent } from './delete-private-vlan/deletedialog.component';
import { PrivateVlanfilterdata } from 'src/app/models/poddetails.model';
import { PrivatevlansService } from './private-vlans.service';
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-private-vlan',
  templateUrl: './private-vlan.component.html',
  styleUrls: ['./private-vlan.component.scss']
})
export class PrivatevlanComponent implements OnInit {

  tableData: PrivateVlanfilterdata[];
  pageTitle:string = "Private VLANs Management";
  

  // Define column for customer management
  columnHeader = ["vlanIdString","dataCenter","podName","customerName","cid", "actions"];

  deleteDialog = DeletedialogvlanComponent;

  titleComponent = "Private Vlans";
  pageLength:number;
  pageSize:number;
  eventValue: any;
  pageIndex: number = 0;
  recordPage: number;
  cutomerContract: string;
  showTablestatus:boolean;
  private dataCenterId: number;
  private podId: number;
  constructor(public privateVlanService: PrivatevlansService,
              // public roleService: RoleService,
              // public auth: AuthHolderService,
              public route: ActivatedRoute,
              public router:Router,
               private dialog: MatDialog) {
                
                // this.dataCenterId = +(this.route.parent.parent.parent.snapshot.params.id); 
                // // console.log('***',this.dataCenterId);

                this.privateVlanService.sharepddcData.subscribe(receiveddata=> {  
                   let splitData = receiveddata.split('-');
                   this.dataCenterId = parseInt(splitData[0]);
                   this.podId = parseInt(splitData[1]);
                   this.reloadData();
                })
            }
   ngOnInit() {
     this.reloadData()
   }

   // For Paging and filtering
   reloadData(indexValue?:number, recordPage?:number, fieldName?:any, fieldValue?:any ) {
       
    indexValue = (indexValue == null) ? 1 : indexValue;
    recordPage = (recordPage == null) ? 5 : recordPage;

    // this.podId  | will loads on this page 
    // this.dataCenterId  |  will load on this page

     let podId: number = 71;
     let datacenterId: number = 72;

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
   

  
      let dataPrivatelan = {
        "orfilter":orfilter,
        "andfilter":{
                      "pod":{ 
                              "id": podId,
                              "dataCenter.id":datacenterId
                            }
                    },
        "ascSorting":["vlanId"],
        "descSorting":[],
        "pageNo": indexValue.toString(),
        "recordsPerPage": recordPage.toString()
      }

      // console.log(dataPrivatelan);
      
     
      this.privateVlanService.getprivateListdata(dataPrivatelan)
      .subscribe( (data) => { 
        
        console.log(data);
        
        this.tableData = data.data;
        this.pageLength = data.totalResult;
        this.pageSize = data.filter.recordsPerPage;
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

  clickCell(event) {

  }
 
  

}
