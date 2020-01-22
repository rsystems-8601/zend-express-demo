import { Component, OnInit, Input } from '@angular/core';
import { TabListItem } from 'src/app/models/tab-lists-dto';


@Component({
  selector: 'app-provision-tabs',
  templateUrl: './provision-tabs.component.html',
  styleUrls: ['./provision-tabs.component.scss']
})
export class ProvisionTabsComponent implements OnInit {

  imagePath:string = 'assets/images/datacenter-configure';
  showList:boolean = false;
  configPath:TabListItem[] = [];


  @Input() activeClass;

  constructor() { 

    this.configPath = [{
      labelName:"Summary",
      path:"/summary",
      isActive:""
    },
    {
      labelName:"Configure",
      path:"/configure",
      isActive:"active"
    },
    {
      labelName:"Configure",
      path:"/configure/pod-list",
      isActive:"active"
    },
    {
      labelName:"Provision",
      path:"/provision",
      isActive:""
    }
    ,{
      labelName:"Monitor",
      path:"/monitor",
      isActive:""
    },{
      labelName:"Api Integration",
      path:"API",
      isActive:""
    }]

  }

  ngOnInit() {
  }

}
