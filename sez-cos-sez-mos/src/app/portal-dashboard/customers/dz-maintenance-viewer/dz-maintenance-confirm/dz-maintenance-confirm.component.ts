import {Component, Inject} from "@angular/core";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({templateUrl: "./dz-maintenance-confirm.component.html"})
export class DzMaintenanceConfirmComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public confirmationMessage: String,
                public dialogRef: MatDialogRef<DzMaintenanceConfirmComponent>) {
    }
}