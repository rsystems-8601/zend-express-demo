import {Component, Inject} from "@angular/core";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { MaintenanceEvent } from 'src/app/models/maintenance-event.model';

@Component({templateUrl: "./dz-maintenance-delete-confirmation.html"})
export class DzMaintenanceDeleteConfirmationComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public maintenanceEvent: MaintenanceEvent,
                public dialogRef: MatDialogRef<DzMaintenanceDeleteConfirmationComponent>) {
    }
}