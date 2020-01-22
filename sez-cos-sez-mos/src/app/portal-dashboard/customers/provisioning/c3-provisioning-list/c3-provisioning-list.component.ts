import { Component, OnInit } from '@angular/core';
import { C3ProvisioningService } from '../c3-provisioning.service';
import { map } from 'rxjs/operators';

class provisionListObject {
  constructor(
    public data: Array<Object>,
    public totalResult: number,
    public pageSize: number
  ){}
}

@Component({
  selector: 'app-c3-provisioning-list',
  templateUrl: './c3-provisioning-list.component.html',
  styleUrls: ['./c3-provisioning-list.component.scss']
})
export class C3ProvisioningListComponent implements OnInit {

  provisionQueueColumn = [
    "status", "contractStage","provisioningRequestId","dueDate",
    "dateEntered","partner","customerName","projectName","sdm",
    "se","sales","engineer","crm","Action"
];
provisionTitle: String = 'Provisioning Queue'
 provisionListConfiguration:provisionListObject = new provisionListObject([],0,0);

getProvisionPostObject = {
	"orfilter":{},
	"andfilter":{},
	"ascSorting":[],
	"descSorting":["createdAt"],
	"pageNo":"1",
	"recordsPerPage":"5"
}
  constructor(private provisioningService: C3ProvisioningService) { 
    this.getProvisoningData();
  }

  ngOnInit() {
  }

  getProvisoningData(){
    this.provisioningService.getProvisioningRequest(this.getProvisionPostObject)
    .subscribe(provisionData => {
      this.provisionListConfiguration.data = provisionData.data;
      this.provisionListConfiguration.totalResult = provisionData.totalResult;
      this.provisionListConfiguration.pageSize = provisionData.filter.recordsPerPage;
    })
  }

  provisioningPageChanged(e){
    console.log(e)
    this.getProvisionPostObject.pageNo = e.pageIndex + 1; 
    this.getProvisionPostObject.recordsPerPage = e.pageSize; 
    this.getProvisoningData();
  }

  cellClicked(event){
    console.log(event);
  }
}