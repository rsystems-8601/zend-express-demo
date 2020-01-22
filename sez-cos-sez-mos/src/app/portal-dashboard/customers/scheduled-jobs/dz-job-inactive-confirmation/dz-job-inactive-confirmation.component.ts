import {Component, Inject, EventEmitter} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import {Spinner} from "../../../../common/spinner";
import {ToastyService} from "ng2-toasty/src/toasty.service";
import { MaintenanceEventWithLocalDates } from "../../../../models/maintenance-event.model";


@Component({templateUrl: "./dz-job-inactive-confirmation.component.html",
styles: [`.max-w140 { max-width:140px;} `]
})

export class DzJobInactiveConfirmationComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public job: MaintenanceEventWithLocalDates,
                public dialogRef: MatDialogRef<DzJobInactiveConfirmationComponent>,
                public toastyService: ToastyService) {
    }
}