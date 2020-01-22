import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CosEdithardwareclusterComponent } from './cos-save-edit-hardware-cluster/cos-edit-hardware-cluster.component';
import { DeletedialogComponent } from './delete-hardware-cluster/deletedialog.component';

import { MatDialog } from '@angular/material';
import { HardwareClusters } from 'src/app/models/cos-common.model';
import { HardwareclusterService } from './hardware-cluster.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-hardware-cluster',
  templateUrl: './hardware-cluster.component.html',
  styleUrls: ['./hardware-cluster.component.scss']
})
export class HardwareclusterComponent implements OnInit {

  tableData: HardwareClusters[];
  pageTitle: string = "Hardware Cluster";

  // Define column for hardware management
  columnHeader = ["name", "actions"];



  titleComponent = "Hardware Clusters";
  pageLength: number;
  pageSize: number;
  eventValue: any;
  pageIndex: number;
  recordPage: number;
  cutomerContract: string;
  showTablestatus: boolean;
  private podId: number;
  updateComponent = CosEdithardwareclusterComponent;
  deleteDialog = DeletedialogComponent;
  addbutton = "addcluster";



  constructor(
    private hardwareclusterService: HardwareclusterService, private dialog: MatDialog, private activatedRoute: ActivatedRoute
  ) {

    this.podId = this.activatedRoute.parent.parent.parent.parent.snapshot.params.podId;
    this.hardwareclusterService.sharePoddata.subscribe(receiveddata => {
      this.podId = receiveddata;
      this.reloadData();
    });

    this.hardwareclusterService.reloadDatarequest.subscribe(data => {
      if (data) {
        this.reloadData();
      }

    })


  }

  ngOnInit() {
    this.reloadData()
  }

  reloadData() {

    this.hardwareclusterService.gethardwareclusterData(this.podId)
      .pipe(map(data => data.hardwareClusterList))
      .subscribe((data) => {
        // console.log(data);
        this.tableData = <HardwareClusters[]>data;
      });
  }

  showTable(eventVal) {
    if (eventVal) {
      this.showTablestatus = eventVal;
    } else {
      this.showTablestatus = false;
    }
  }

  ngOnDestroy() {
    //this.hardwareclusterService.sharePoddata.unsubscribe();
  }



}
