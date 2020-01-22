import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { MatDialog } from '@angular/material';

import { PrivateIpsService } from '../../services/private-ips.service';
import { EditIpNetworkComponent } from './edit-ip-network/edit-ip-network.component';
import { DeleteIpNetworkComponent } from './delete-ip-network/delete-ip-network.component';




@Component({
  selector: 'app-ip-networks',
  templateUrl: './ip-networks.component.html',
  styleUrls: ['./ip-networks.component.scss']
})
export class IpNetworksComponent implements OnInit {

  tableData: any;

  // Define column for Private IPs
  columnHeader = ["ipId", "ipNet", "cidr", "publicVlan", "gateway", "subnetMask", "actions"];



  // private readonly notifier: NotifierService;
  deleteDialog = DeleteIpNetworkComponent;
  updateComponent = EditIpNetworkComponent;

  titleComponent: string;
  pageLength: number;
  pageSize: number;
  pageIndex: number = 0;
  // private isPublicIp: boolean;
  private networkType: string;
  private dataCenterId: number;

  constructor(
    public privateIpsService: PrivateIpsService,
    public route: ActivatedRoute,
    public router:Router,
    private dialog: MatDialog
  ) {

    this.dataCenterId = +(this.route.parent.parent.parent.snapshot.params.id);
    // console.log('***',this.dataCenterId);


    this.route.queryParams.subscribe(query =>{
      console.log(query);
      if (query['type'] ==  'true') {
        this.networkType = "true";
        this.titleComponent = "Public IPs";
      } else if (query['type'] ==  'false') {
        this.networkType = "false";
        this.titleComponent = "Private IPs";
        this.columnHeader = ["ipId", "ipNet", "cidr", "gateway", "subnetMask", "actions"];
      } else if (query['type'] == null) {
        this.networkType = "null";
        this.titleComponent = "Elastic IPs";
        this.columnHeader = ["ipId", "ipNet", "cidr", "gateway", "subnetMask", "actions"];
      }
      this.reloadData();
    })



  }

  ngOnInit() {
    // console.log('MYYYYYYYYY');

    this.privateIpsService.reloadDatarequest.subscribe(data=> {
      if(data) {
       this.reloadData(this.pageIndex + 1, this.pageSize);
      }
    })

    this.reloadData();

  }

  // For Paging and filtering
  reloadData(pageNumber?: number, recordsPerPage?: number, fieldName?: any, fieldValue?: any) {
    // console.log(`----------- inside function reloadData pageNumber/ pageIndex= ${pageNumber}`);

    pageNumber = (pageNumber == null) ? 1 : pageNumber;

    recordsPerPage = (recordsPerPage == null) ? 5 : recordsPerPage;

    let environment;
    if (fieldName == 'environment' && fieldValue.trim() != "") {
      environment = fieldValue;
    }
    let ipId;
    if (fieldName == 'ipId' && fieldValue.trim() != "") {
      ipId = fieldValue;
    }
    let netIp;
    if (fieldName == 'ipNet' && fieldValue.trim() != "") {
      netIp = fieldValue;
    }
    let cidrNumber;
    if (fieldName == 'cidr' && fieldValue.trim() != "") {
      cidrNumber = fieldValue;
    }
    let vlan;
    if (fieldName == 'publicVlan' && fieldValue.trim() != "") {
      vlan = { "vlanIdString": fieldValue };
    }
    let netGateway;
    if (fieldName == 'gateway' && fieldValue.trim() != "") {
      netGateway = fieldValue;
    }
    let netSubnetMask;
    if (fieldName == 'subnetMask' && fieldValue.trim() != "") {
      netSubnetMask = fieldValue;
    }

    let requestPayload = {
      "orfilter": {
      },
      "andfilter": {
        "type": this.networkType == "null" ? "BOOLEAN-NULL" : this.networkType == 'true',
        "dataCenter.id": this.dataCenterId,
        "environment": environment,
        "ipId": ipId,
        "netIp": netIp,
        "cidrNumber": cidrNumber,
        "vlan": vlan,
        "netGateway": netGateway,
        "netSubnetMask": netSubnetMask
      },
      "ascSorting": [],
      "descSorting": [],
      "pageNo": pageNumber,
      "recordsPerPage": recordsPerPage
    }

    let respData = [];
    this.privateIpsService.getprivateIpsList(requestPayload)
      .subscribe((data) => {
        respData = data.data.map(res => {
          res["ipNet"] = res["networkIp"];
          res["cidr"] = res["cidrNumber"];
          if (res.datacenterView) {
            res["datacenter"] = res.datacenterView["name"];
          }
          if (res.vlanView) {
            res["publicVlan"] = res.vlanView["name"];
          }

          return res;
        });
        this.pageLength = data.totalResult;
        this.pageSize = data.filter.recordsPerPage;
        this.tableData = respData;

        let totalPages = Math.ceil(data.totalResult / data.filter.recordsPerPage);

        if(totalPages>= pageNumber){
          // console.log(`If totalPages ${totalPages}  --- pageNumber/pageIndex ${pageNumber}`);
          this.pageIndex = pageNumber - 1;
          // console.log(`new page index ${this.pageIndex}`);
        }else{
          // console.log(`Else totalPages ${totalPages}  --- pageNumber/pageIndex ${pageNumber}`);
          this.pageIndex = totalPages - 1;
          // console.log(`new page index ${this.pageIndex}`);
          this.reloadData(this.pageIndex + 1, this.pageSize, null, null);
        }

      });
  }

  // Paging for API
  pageChanged(event: any) {
   // console.log(`-------------inside pageChanged --- event -- ${event}`);
    this.reloadData(event.pageIndex + 1, event.pageSize, null, null);
    // this.pageIndexStore = event.pageIndex;
  }

  // Searched field and its value
  searchValues(eventValue: any) {
    let mydata = eventValue.split('+');
    let fieldName = mydata[1];
    let fieldValue = mydata[0];
    this.reloadData(null, this.pageSize, fieldName, fieldValue);
  }

  clickCell(row,eb) {
      console.log(row);
  }

}
