import { Component, OnInit } from '@angular/core';
import { TabListItem } from 'src/app/models/tab-lists-dto';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-datacenter-detail',
  templateUrl: './datacenter-view.component.html',
  styleUrls: ['./datacenter-view.component.scss']
})
export class DatacenterViewComponent implements OnInit {

  configPath:TabListItem[] = [];
  private datacenterId;
  constructor(private route: ActivatedRoute) {

   }

  ngOnInit() {

    this.configPath = [{
      labelName:"Summary",
      path:"./",
      isActive:"true"
    },
    {
      labelName:"Configure",
      path:"./configure/datacenter-details",
      isActive:"active"
    },
    {
      labelName:"Provision",
      path:"./provision",
      isActive:""
    }
    ,{
      labelName:"Monitor",
      path:"./",
      isActive:""
    },{
      labelName:"Api Integration",
      path:"./",
      isActive:""
    }];
  }
}


