import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({templateUrl: "./dz-delete-confirmation-management.component.html"})
export class DzDeleteConfirmationManagementComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public messageObject: any,
                public dialogRef: MatDialogRef<DzDeleteConfirmationManagementComponent>) {
    }
}