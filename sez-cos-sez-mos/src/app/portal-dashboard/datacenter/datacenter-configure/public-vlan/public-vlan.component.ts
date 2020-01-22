import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';


// Custom models

import { PrivateVlanfilterdata } from '../../../../models/private-vlan.model';
import { DeletedialogpublicvlanComponent } from './delete-public-vlan/deletedialog.component';
import { PublicvlansService } from '../../services/public-vlans.service';
import { ActivatedRoute } from '@angular/router';
import { CosEditPublicvlanComponent } from './cos-save-edit-public-vlan/cos-edit-public-vlan.component';



@Component({
  selector: 'app-public-vlan',
  templateUrl: './public-vlan.component.html'
})
export class PublicvlanComponent implements OnInit {

  tableData: PrivateVlanfilterdata[];
  pageTitle = "Public VLANs Management";



  // Define column for customer management
  columnHeader = ["vlanIdString", "dataCenter", "environmentType", "actions"];

  deleteDialog = DeletedialogpublicvlanComponent;
  updateComponent = CosEditPublicvlanComponent;
  titleComponent = "Public Vlans";
  pageLength: number;
  pageSize: number;
  eventValue: any;
  pageIndex = 0;
  recordPage: number;
  cutomerContract: string;
  showTablestatus: boolean;
  private dataCenterId: number;
  private podId: number;
  datacenterId: number;



  constructor(
    public publicVlanService: PublicvlansService,
    // public roleService: RoleService,
    // public auth: AuthHolderService,
    private dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    this.datacenterId = this.activatedRoute.parent.parent.parent.snapshot.params.id;


  }
  ngOnInit() {

    this.publicVlanService.sharepddcData.subscribe(data => {
      if (data) {
        this.reloadData(this.pageIndex + 1, this.pageSize);
      }
    })

    this.reloadData();

  }

  // For Paging and filtering
  reloadData(indexValue?: number, recordPage?: number, fieldName?: any, fieldValue?: any) {

    indexValue = (indexValue == null) ? 1 : indexValue;
    recordPage = (recordPage == null) ? 5 : recordPage;

    // this.podId  | will loads on this page 
    // this.dataCenterId  |  will load on this page



    let orfilter = {};

    if (fieldName && fieldValue) {
      if (fieldName === "dataCenter") {
        orfilter = { dataCenter: { name: fieldValue } }
      } else if (fieldName == "environmentType") {
        orfilter = { environment: fieldValue }
      } else {
        orfilter[fieldName] = fieldValue;
      }
    }

    //  console.log(orfilter);

    // orfilter[fieldName] = fieldValue;

    const dataPrivatelan = {
      orfilter: orfilter,
      andfilter: { dataCenter: { id: +this.datacenterId } },
      ascSorting: ["vlanId"],
      descSorting: [],
      pageNo: indexValue.toString(),
      recordsPerPage: recordPage.toString()
    }

    // console.log(dataPrivatelan);


    this.publicVlanService.getPublicVlanListData(dataPrivatelan)
      .subscribe((data) => {

        // console.log(data);

        this.tableData = data.data;
        this.pageLength = data.totalResult;
        this.pageSize = data.filter.recordsPerPage;
        const totalPages = Math.ceil(data.totalResult / data.filter.recordsPerPage);

        if (totalPages >= indexValue) {
          this.pageIndex = indexValue - 1;
        } else {
          this.pageIndex = totalPages - 1;
          this.reloadData(this.pageIndex + 1, this.pageSize, null, null);
        }

      });


  }
  // Paging for API
  pageChanged(event: any) {
    this.reloadData(event.pageIndex + 1, event.pageSize, null, null);
  }


  // Searched field and its value
  searchValues(eventValue: any) {
    const mydata = eventValue.split('+');
    const fieldName = mydata[1];
    const fieldValue = mydata[0];
    this.reloadData(null, null, fieldName, fieldValue);
  }


  showTable(eventVal) {
    if (eventVal) {
      this.showTablestatus = eventVal;
    } else {
      this.showTablestatus = false;
    }

  }

  clickCell(event) {

  }



}
