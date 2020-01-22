import { Component, OnInit } from '@angular/core';
import { HardwareService } from '../services/hardware.service';
import { RoleService } from 'src/app/services/role.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hardware } from 'src/app/models/hardware.model';


@Component({
  selector: 'app-hardware-array',
  templateUrl: './hardware-array.component.html',
  styleUrls: ['./hardware-array.component.scss']
})
export class HardwareArrayComponent implements OnInit {

  columnHeader = ["name", "make", "model", "serialNumber", "cores", "drives", "warrantyPeriod", "actions"];

  // Dynamic Title and Add button
  titleComponent = "array";
  addbutton = "addHardware";
  pageLength: number;
  pageSize: number;
  eventValue: any;
  pageIndex: number;
  recordPage: number;
  podId: any;
  tableData: Hardware[];

  constructor(public hardwareService: HardwareService,
    public roleService: RoleService,
    public auth: AuthHolderService,
     private activatedRoute: ActivatedRoute
      ) {

      // POD Id from route
      this.podId = this.activatedRoute.parent.parent.parent.parent.snapshot.params.podId;
      
     }

  ngOnInit() {
    this.reloadData();
  }

  // For Paging and filtering
  // For Paging and filtering
  reloadData(indexValue?: number, recordPage?: number, fieldName?: any, fieldValue?: any) {

    indexValue = (indexValue == null) ? 1 : indexValue;
    recordPage = (recordPage == null) ? 5 : recordPage;

    let orfilter = {};

    // if(fieldName && fieldValue) {
    //   if(fieldName == "customerName") {
    //       orfilter = { "customer.name": fieldValue };
    //   } else if(fieldName == "cid") {
    //     orfilter = { "customer.custId-like-": fieldValue };
    //   }  else if(fieldName == "privateDomainName") {
    //     orfilter = { "orderProduct.privateDomainName": fieldValue };
    //   }   else if(fieldName == "publicURL") {
    //     orfilter = { "orderProduct.publicUrl": fieldValue };
    //   } 
    // else {
    //   orfilter[fieldName] = fieldValue;
    // }
    if(fieldName && fieldValue) { 
      // // console.log(fieldName);
      // if(fieldName=='serialNumber') {
      //   orfilter[fieldName] = parseInt(fieldValue);
      // } else {
        orfilter[fieldName] = fieldValue;
      // } 
      
    }
    
    this.hardwareService.getHardwaredataTypeAndPodid({"andfilter":{"pod.id":this.podId,"type":"ARRAY"},
    "ascSorting":[],"descSorting":[],"pageNo":indexValue,"recordsPerPage":recordPage, orfilter} ).subscribe(data => {
      this.tableData = data.data;
      this.pageLength = data.totalResult;
      this.pageSize = data.filter.recordsPerPage;
    });
  }


  // Paging for API
  pageChanged(event: any) {
    this.reloadData(event.pageIndex + 1, event.pageSize, null, null);
  }

  // Searched field and its value
  searchValues(eventValue: any) {
    let mydata = eventValue.split('+');
    let fieldName = mydata[1];
    let fieldValue = mydata[0];
    this.reloadData(null, null, fieldName, fieldValue);
  }

}
