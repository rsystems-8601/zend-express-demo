import { Component, OnInit } from '@angular/core';
import { TabListItem } from 'src/app/models/tab-lists-dto';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-pod-view',
  templateUrl: './pod-view.component.html',
  styleUrls: ['./pod-view.component.scss']
})
export class PodViewComponent implements OnInit {

  configPath:TabListItem[] = [];
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
      path:"./configure/pod-details",
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


