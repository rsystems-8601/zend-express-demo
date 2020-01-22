import { DatacenterModule } from './../../portal-dashboard/datacenter/datacenter.module';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import * as XLSX from "xlsx";
import { SelectionModel } from '@angular/cdk/collections';
import { DataTableSharedService } from './data-table.service';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent<T> implements OnInit, OnChanges {



  dataSource: any;
  titleOfComponent: any;
  isLoading: boolean;
  // Input values for sending common data to components
  @Input() tableData;
  @Input() columnHeader;
  @Input() hasFilter: boolean;
  @Input() hasPaging: boolean;
  @Input() titleComponent;
  @Input() addbutton;
  @Input() hasDelete;
  @Input() dataDialog;
  @Input() restartJobscomp;
  @Input() resumeJobscomp;
  @Input() statusDialog;
  @Input() downloadLog;
  @Input() jobstatusDialog;
  @Input() jobvarsdetailsDialog;
  @Input() deleteDialog;
  @Input() pageLength;
  @Input() pageIndex;
  @Input() pageSize;
  @Input() editButton: boolean;
  @Input('readonly') csReadonly;
  @Output() deleteEvent = new EventEmitter<string>();
  @Output('pageChanged') pageChanged = new EventEmitter<any>();
  @Output() searchValues = new EventEmitter<any>();
  @Output() clickCell = new EventEmitter<any>();
  @Output() radioChangedvalue = new EventEmitter<any>();
  private subject = new Subject<any>();
  @Input() exportButton: boolean = false;

  // Material sorting and paging config
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  editable: any;
  selectedRadio: boolean;
  radioButtonData: any;
  selectedPerson: any;
  dataCenterId: any;
  notFoundMessage = '';

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataTableServive: DataTableSharedService
  ) {

    this.dataCenterId = this.activatedRoute.parent.parent.parent.parent.snapshot.params.id;

  }


  /** The label for the checkbox on the passed row */


  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.radioButtonData = this.dataSource.data[0];
    if (this.radioButtonData) {
      this.radioChangedvalue.next(this.radioButtonData);
    }
    this.dataSource.sort = this.sort;
    this.hasFilter = this.hasFilter == true || this.hasFilter == false ? this.hasFilter : true;
    this.hasPaging = this.hasPaging == true || this.hasPaging == false ? this.hasPaging : true;
    this.notFoundMessage = '';
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getValuechange(value11: any) {
    if (value11 == null) {
      this.selectedRadio = true;
    } else {
      this.radioChangedvalue.next(value11)
    }

  }

  // Loads component data with configuratons
  ngOnChanges() {

    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.sort = this.sort;
    this.titleOfComponent = this.titleComponent;
    if (this.dataSource.data.length === 0) {
      this.notFoundMessage = 'Record not found';
    } else {
      this.notFoundMessage = '';
    }
  }

  applyFilter(fieldName: string, fieldValue: string) {
    this.searchValues.next(fieldName + "+" + fieldValue);
  }

  getNext(event: PageEvent) {
    this.pageChanged.next(event);
  }
  // Data for Edit or Delete
  openEdit(data?, view?) {
    console.log(data);

    // if(data && view){
    //   data.editable = true;
    // } else if(data) {
    //   data.editable = false;
    // }
    // const dialogRef = this.dialog.open(this.dataDialog, {
    //   width: '1300px',
    //   height: '800px',
    //   data: data || {}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   // data = result.data;
    // });

    this.dataTableServive.setRowData = data;
    this.router.navigate(['./', data.id], { relativeTo: this.activatedRoute });
  }

  // Update Status
  changeStatus(data?) {
    const dialogRef = this.dialog.open(this.statusDialog, {
      width: '550px',
      height: 'auto',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  restartJobs(data?) {
    const dialogRef = this.dialog.open(this.restartJobscomp, {
      width: '550px',
      height: 'auto',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  resumeJobs(data?) {
    const dialogRef = this.dialog.open(this.resumeJobscomp, {
      width: '550px',
      height: 'auto',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }



  downloadLogs(data?) {
    const dialogRef = this.dialog.open(this.downloadLog, {
      width: '550px',
      height: 'auto',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }


  getPoddetails(row) {
    this.router.navigateByUrl('console/datacenter-list/' + this.dataCenterId + '/' + row.id + '/configure/pod-details');
  }

  getIpnetwork(row) {
    if (row.environment === "Compliance") {
      var envTypeValue = 'Compliant';
    }
    this.router.navigate(['../ip-network', row.id], {
      relativeTo: this.activatedRoute, queryParams:
        { envType: envTypeValue, type: row.type }
    });
  }



  changejobStatus(data?) {
    let jobstatus = data.status;
    const dialogRef = this.dialog.open(this.jobstatusDialog, {
      width: '900px',
      height: "600px",
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  jobvarsDetails(data?) {

    const dialogRef = this.dialog.open(this.jobvarsdetailsDialog, {
      width: '900px',
      height: '600px',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  // Popup For delete request
  deleteRow(data?) {
    const dialogRef = this.dialog.open(this.deleteDialog, {
      width: '550px',
      height: 'auto',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteEvent.emit(result);
    });
  }


  rowClick(row, cell) {
    this.clickCell.next(
      {
        data: row,
        cell: cell
      }
    );
  }

  exportTable(gridName?: string, fileName?: string) {
    this.exportToExcel(gridName);
  }

  exportToExcel(tableId: string, name?: string) {
    let timeSpan = new Date().toISOString();
    let prefix = name || "ExportResult";
    let fileName = `${prefix}-${timeSpan}`;
    let targetTableElm = document.getElementById(tableId);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{ sheet: prefix });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  
}
