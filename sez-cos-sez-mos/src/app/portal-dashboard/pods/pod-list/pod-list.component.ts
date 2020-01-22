import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { ActivatedRoute, Router, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { CosPodManagementComponent } from './pod-edit/cos-pod-management.component';
import { PodManagement } from 'src/app/models/pod-model/pod-management.model';
import { Pods } from 'src/app/models/cos-common.model';
import { PodServicesService } from '../pod-services.service';


@Component({
  selector: 'app-pod-list',
  templateUrl: './pod-list.component.html',
  styleUrls: ['./pod-list.component.scss']
})
export class PodListComponent implements OnInit {

  classActive: string;
  podDatalist: PodManagement[];
  tableData: Pods[] = [];

  columnHeader = ["podName", "networkType", "actions"];

  titleComponent = "Pod Lists";
  pageLength: number;
  pageSize: number;
  eventValue: any;
  pageIndex: number;
  recordPage: number;
  hasFilterdata = false;
  sub: any;
  id$: any;
  dataCenterId: number;
  updateComponent = CosPodManagementComponent;


  constructor(
    private _podServicedata: PodServicesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.dataCenterId = this.activatedRoute.parent.parent.parent.parent.snapshot.params.id;
  }

  ngOnInit() {

    this.getPodlist();

  }

  getPodlist() {
    this._podServicedata.getPodList(this.dataCenterId).subscribe((podData: Pods[]) => {
      this.tableData = podData;
    });
  }

}
