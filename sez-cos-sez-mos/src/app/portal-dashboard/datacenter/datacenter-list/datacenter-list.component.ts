import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';

import {DataCenterList } from "./data-centertem-class";
import { CircleListServcie } from '../services/circle-list.service';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-datacenter-list',
  templateUrl: './datacenter-list.component.html',
  styleUrls: ['./datacenter-list.component.scss']
})
export class DatacenterListComponent implements OnInit, AfterViewInit {

    masterList:any = [];
    parentList = []
    constructor(private circleList: CircleListServcie) { }

  ngOnInit() {
    // this.masterList = DataCenterList.getDataCenter();
    this.getDatacenters();
  }

ngAfterViewInit(){
    
}

cirlcLeClicked(event){
    
    if(event.parent){
      let index = event.parent.id - 1;
      switch (event.parent.listLevelType){
        case "DataCenters":
            this.getDatacenters();
            break;
        case "Pods":
          this.getPodList(this.parentList[index]);
          break;
        case "Customers":
            this.getCustomerList(this.parentList[index]);
            break;
        case "PrivateClouds":
            this.getPrivateCloud(this.parentList[index]);
            break;
          case "DesktopPools":
            this.getDesktopPool(this.parentList[index]);
            break;
      }
    }else{
        
        switch (event.listLevelType){
          case "DataCenters":
              this.getPodList(event);
              break;
          case "Pods":
              this.getCustomerList(event);
              break;
          case "Customers":
              this.getPrivateCloud(event);
              break;
          case "PrivateClouds":
             this.getDesktopPool(event);
             break;
          case "DesktopPools":
            this.getDesktopUsers(event);
            break;
        }        
    }
}
 
getDatacenters(){
  this.circleList.getDatacenterList().subscribe(dsList => {
    this.masterList = dsList;
    this.setCircleParent(null);
  })
}

getPodList(clickedListItem){
    this.circleList.getDatcenterPOD(clickedListItem.listLevelID)
    .subscribe(podList => {
      this.masterList = podList;
      this.setCircleParent(clickedListItem);
    })
}


getCustomerList(clickedListItem){
  this.circleList.getPodCustomer(clickedListItem.listLevelID).subscribe(podCustomer => {
    this.masterList = podCustomer;
    this.setCircleParent(clickedListItem);
  })
}

getPrivateCloud(clickedListItem){
  this.circleList.getCustomerPrivatCloud(clickedListItem.listLevelID).subscribe(privateCloud => {
    this.masterList = privateCloud;
    this.setCircleParent(clickedListItem);
  });
}

getDesktopPool(clickedListItem){
  this.circleList.getDesktopPool(clickedListItem.listLevelID).subscribe(desktopPools => {
    this.masterList = desktopPools;
    this.setCircleParent(clickedListItem);
  });
}

getDesktopUsers(clickedListItem){
  this.circleList.getDesktopPoolUsers(clickedListItem.listLevelID).subscribe(desktopPoolUsers => {
    this.masterList = desktopPoolUsers;   
    this.setCircleParent(clickedListItem); 
  });
}

setCircleParent(clickedListItem){
  
  if(clickedListItem){
    let parentListItem = clickedListItem;
    // this.parentList.splice(parentListItem.id)
    if(parentListItem.id >= 0 ){
      this.parentList.splice(parentListItem.id);
    }
    parentListItem.id = this.parentList.length ;
    this.parentList.push(parentListItem);
  }else{
    this.parentList = [{id:0}]
  }
 }
}

