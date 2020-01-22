import { Component, OnInit, Inject } from '@angular/core';
import { CustomerAssignment } from '../../../models/customerassignment.model';
import { CustomerAssignmentService } from '../services/customer-assgnment.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DeletedialogCustomerassignmentComponent } from './delete-customer-assignment/deletedialog.component';


@Component({
  selector: 'app-customer-assignment-details',
  templateUrl: './customer-assignment-details.component.html',
  styleUrls: ['./customer-assignment-details.component.scss']
})
export class CustomerAssignmentDetailsComponent implements OnInit {

  tableData: CustomerAssignment[] = [];

  columnHeader = ['radio', "cid", "customerName", "privateDomainName", "publicURL", "actions"];

  // "podHWCluster","privateNetworkSize","privateIP","privateDomainName","vLan", "publicIP1", "publicIP2", "publicIP3","actions"

  titleComponent = "customerAssignment";
  addbutton = "newCustomerAsignment";
  pageLength: number;
  pageSize: number;
  eventValue: any;
  pageIndex = 0;
  recordPerPage: number;
  customerAssignmentDatails: any;
  customerConfiguration: any;
  customerLocation: any;
  deleteDialog = DeletedialogCustomerassignmentComponent;
  details: any;

  constructor(
    private customerassignmentService: CustomerAssignmentService
  ) {


  }

  ngOnInit() {
    this.customerassignmentService.reloadDatarequest.subscribe(dataCustomer => {
      if (dataCustomer) {
        this.reloadData(this.pageIndex + 1, this.pageSize);
      }
    });
    this.reloadData();
  }

  reloadData(indexValue?: number, recordPage?: number, fieldName?: any, fieldValue?: any) {

    indexValue = (indexValue == null) ? 1 : indexValue;
    recordPage = (recordPage == null) ? 5 : recordPage;

    this.pageIndex = indexValue;
    this.recordPerPage = recordPage;
    let orfilter = {};

    if (fieldName && fieldValue) {
      if (fieldName == "customerName") {
        orfilter = { "customer.name": fieldValue };
      } else if (fieldName == "cid") {
        orfilter = { "customer.custId-like-": fieldValue };
      } else if (fieldName == "privateDomainName") {
        orfilter = { "orderProduct.privateDomainName": fieldValue };
      } else if (fieldName == "publicURL") {
        orfilter = { "orderProduct.publicUrl": fieldValue };
      } else {
        orfilter[fieldName] = fieldValue;
      }
    }



    this.customerassignmentService.getCustomerAsignmentList({
      andfilter: {},
      ascSorting: ["customer.cid"], descSorting: [], pageNo: indexValue, recordsPerPage: recordPage, orfilter
    })
      .subscribe(data => {

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
    let mydata = eventValue.split('+');
    let fieldName = mydata[1];
    let fieldValue = mydata[0];
    this.reloadData(null, null, fieldName, fieldValue);
  }

  radiovalues(radioValues) {
    this.customerAssignmentDatails = radioValues;

    console.log(radioValues, "radio");


    let publicIps = radioValues.publicIP1 + ', ' + radioValues.publicIP2 + ', ' + radioValues.publicIP3;
    let resourcePool = radioValues.resourcePool;
    if (resourcePool == null) {
      resourcePool = "NA"
    } else {
      resourcePool = radioValues.resourcePool;
    }

    this.details = {
      "Customer ID": radioValues.customerId, "Customer Name": radioValues.customerName,
      "Customer Domain": radioValues.privateDomainName, "Customer URL": radioValues.publicURL
    };

    this.customerConfiguration = {
      "Public Ips": publicIps, "Private IP Ranges": radioValues.privateIP,
      "Virtual Network": radioValues.privateNetworkSize, "Private VLAN": radioValues.vLan
    };

    this.customerLocation = { "Datacenter": radioValues.datacenter, "POD": radioValues.pod, "Hardware Cluster": radioValues.podHWCluster, "Resource Pool": resourcePool }

    // console.log(this.customerLocation);


  }

}
