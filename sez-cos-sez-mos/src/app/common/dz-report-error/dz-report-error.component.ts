import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { ReportErrorCreateRequest } from 'src/app/models/user.model';

@Component({templateUrl: "./dz-report-error.component.html"})
export class DzReportErrorComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public reportErrorRequest: ReportErrorCreateRequest,
                public dialogRef: MatDialogRef<DzReportErrorComponent>) {
                    reportErrorRequest.localizedMessage = "";
                    console.log(reportErrorRequest);
    }

    closeDialog() {
        this.dialogRef.close(null);
    }

    openImage() {
        let image = new Image();
        image.src = this.reportErrorRequest.image;
        let w = window.open("");
        w.document.write(image.outerHTML);
    }
}