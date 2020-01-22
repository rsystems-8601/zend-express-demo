import {Component, Inject, EventEmitter} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import {ToastyService} from "ng2-toasty/src/toasty.service";
import {DateUtils} from "../../../../common/date-utils";
import { MaintenanceEventWithLocalDates } from "../../../../models/maintenance-event.model";
// import { DzReportReleaseConfirmationComponent } from "../dz-report-release-confirmation/dz-report-release-confirmation.component";

@Component({templateUrl: "./dz-job-changefreeze-confirmation.component.html",
styles: [` .bg-heading{background-color: #ffdcc4;}
            .weight-500{font-weight: 500;}
            .mg-lt-20{ margin-left: 20px;}

.current-date{background-color: #03A9F4 !important;}

.align-right{
  text-align: right;
}

.mg-tp-12 { margin-top: 12px;}

.mat-list-item {
  height: auto;
  padding: 6px 0 6px 0;
}
:host ::ng-deep .mat-list-item-content{
    padding: 0px 12px 6px;
}

:host ::ng-deep .mat-chip {margin: 2px 2px 0 2px !important;}
.mg-tp-bt-20 { margin: 20px 30px 20px;}

h5.pd-10-20 {margin: 10px 20px 0px;}

.max-long{
  // max-width:300px;
  // min-width:200px;
  width: 250px;
}

:host ::ng-deep .mat-chip-list-wrapper {
  // max-width:400px !important;
  // min-width:250px !important;
  width: 388px;
}

.max-w140 { max-width:140px;} `]})

export class DzJobChangeFreezeConfirmationComponent {
    DateUtils = DateUtils;
    timezone = DateUtils.getTimeZoneShort();
    
    constructor(@Inject(MAT_DIALOG_DATA) public jobs: MaintenanceEventWithLocalDates[],
                public dialogRef: MatDialogRef<DzJobChangeFreezeConfirmationComponent>,
                public toastyService: ToastyService) {

    }


    downloadReport() {
       // window.open(this.report.awsFilePath);
    }
}