import {Component, Inject, EventEmitter} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import {Spinner} from "../../../../common/spinner";
import {ToastyService} from "ng2-toasty/src/toasty.service";
import {DateUtils} from "../../../../common/date-utils";
import { MaintenanceEventWithLocalDates, MaintenanceEvent } from "../../../../models/maintenance-event.model";
import { MaintenanceEventChangeFreezeCheck } from "../../../../services/maintenance.service";
// import * as _ from "lodash";
// import { moment } from "ngx-bootstrap/chronos/test/chain";

@Component({templateUrl: "./dz-job-management-confirmation.component.html",
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

export class DzJobManagmentConfirmationComponent {
    DateUtils = DateUtils;
    timezone = DateUtils.getTimeZoneShort();
    approvers: String;
    impactedOrganizations: String;
    maintenanceEvents: MaintenanceEvent[];

    constructor(@Inject(MAT_DIALOG_DATA) public maintenanceEventChangeFreezeCheck: MaintenanceEventChangeFreezeCheck,
                public dialogRef: MatDialogRef<DzJobManagmentConfirmationComponent>,
                public toastyService: ToastyService) {
                    this.approvers = maintenanceEventChangeFreezeCheck.approvers.map(approver => approver.firstName + ' ' + approver.lastName).join(", ");
                    this.impactedOrganizations = maintenanceEventChangeFreezeCheck.organizations.map(org => org.name + ' (' + org.customerId + ')').join(", ");
                    this.maintenanceEvents = maintenanceEventChangeFreezeCheck.maintenanceEvents.reduce((accumulator, current) => {
                      if (this.checkIfAlreadyExist(current, accumulator)) {
                        return accumulator
                      } else {
                        return accumulator.concat([current]);
                      }
                    }, []);

    }

    checkIfAlreadyExist(currentVal, accumulator) {
      return accumulator.some(function(item) {
        return (item.startDateTime === currentVal.startDateTime);
      });
    }


}