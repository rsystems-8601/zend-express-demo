import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { MaintenanceEventWithRecurrencePatterns } from "../../../../../models/maintenance-event.model";

@Component({templateUrl: "./dz-resend-approval-mail-confirmation.component.html",
styles: [` .italic{font-style: italic;} `]})
export class DzJobApprovalResendMailConfirmationComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public job: MaintenanceEventWithRecurrencePatterns,
                public dialogRef: MatDialogRef<DzJobApprovalResendMailConfirmationComponent>) {

    }
}