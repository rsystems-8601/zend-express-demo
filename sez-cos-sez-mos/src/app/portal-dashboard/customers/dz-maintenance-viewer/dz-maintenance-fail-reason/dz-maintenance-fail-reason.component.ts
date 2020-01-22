import {Component, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from "@angular/material";


@Component({
    selector: "dz-maintenance-fail-reason",
    templateUrl: "./dz-maintenance-fail-reason.component.html"
})
export class DzMaintenanceFailReasonComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public typePlaceHolder: string,
    public dialogRef: MatDialogRef<DzMaintenanceFailReasonComponent>) {
    }

    failMaintenance(failureReason) {
        this.dialogRef.close({failureReason: failureReason});
    }
}