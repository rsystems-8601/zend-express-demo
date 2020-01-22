import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

// Custom models
import { DeletedialogvrrpComponent } from './delete-vrrp-group/deletedialog.component';
import { PrivateVlanfilterdata } from 'src/app/models/poddetails.model';
import { VrrpgroupService } from './vrrp-group.service';



@Component({
  selector: 'app-vrrp-group',
  templateUrl: './vrrp-group.component.html',
  styleUrls: ['./vrrp-group.component.scss']
})
export class VrrpgroupComponent implements OnInit {

  tableData: PrivateVlanfilterdata[];
  pageTitle:string = "VRRP Group Management";

  // Define column for customer management
  columnHeader = ["vrrGroupIdString","vrrGroupSyncName","datacenterName","podName","vlanName","customerName","customerId", "actions"];

  titleComponent = "VRRP Group";
  deleteDialog = DeletedialogvrrpComponent;
  pageLength:number;
  pageSize:number;
  eventValue: any;
  pageIndex: number;
  recordPage: number;
  cutomerContract: string;
  showTablestatus:boolean;
  private dataCenterId: number;
  private podId: number;
  constructor(public privateVlanService: VrrpgroupService,
              // public roleService: RoleService,
              // public auth: AuthHolderService,
               private dialog: MatDialog) {
                
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

     let podId: number = 60;
     let datacenterId: number = 72;
    
    let orfilter = {};
    
  
    if(fieldName && fieldValue) {
      if(fieldName == "customerName") {
          orfilter = { "customer": { "name" : fieldValue } }
      } else if(fieldName == "customerId") {
        orfilter = { "customer": { "custId" : fieldValue } }
      }  else if(fieldName == "datacenterName") {
        orfilter = { "pod": { "dataCenter.name" : fieldValue } }
      } else if(fieldName == "podName") {
        orfilter = { "pod": { "name" : fieldValue } }
      } else if(fieldName == "vlanName") {
        orfilter = { "vlan": { "vlanIdString" : fieldValue } }

      } 
      else {
        orfilter[fieldName] = fieldValue;
      }
   }
   
      let dataPrivatelan = {
        "orfilter":orfilter,
        "andfilter":{
                      "pod":{ 
                              "id": podId,
                              "dataCenter.id":datacenterId
                            }
                    },
        "ascSorting":["vrrGroupId"],
        "descSorting":[],
        "pageNo": indexValue.toString(),
        "recordsPerPage": recordPage.toString()
      }
     
      this.privateVlanService.getvrrpListdata(dataPrivatelan)
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
 
  

}
