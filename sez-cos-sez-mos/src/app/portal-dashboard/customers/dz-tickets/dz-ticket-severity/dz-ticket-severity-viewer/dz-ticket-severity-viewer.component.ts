import {Component, Inject, Input} from "@angular/core";
import {Location} from "@angular/common";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

import { findLast as _findLast,
         forEach as _forEach}  from "lodash";
import { SeverityInfoObject } from 'src/app/models/ticket.model';


@Component({
    selector: "dz-ticket-severity-viewer",
    templateUrl: "./dz-ticket-severity-viewer.component.html",
    styleUrls: ["./dz-ticket-severity-viewer.component.scss"]
})

export class DzTicketSeverityViewerComponent {
    severityLevels: any;
    severity: any;

    constructor(@Inject(MAT_DIALOG_DATA) public severityObject: SeverityInfoObject,
    private dialogRef: MatDialogRef<SeverityInfoObject>) {
        this.severityLevels = severityObject.severityLevels
        this.severity = _findLast(severityObject.severityLevels, function(severity) {

            if (severity.impact == severityObject.severityInfo.impact && severity.urgency == severityObject.severityInfo.urgency) {
                severity["selected"] = true
            }
            return severity.impact == severityObject.severityInfo.impact && severity.urgency == severityObject.severityInfo.urgency;
        })
    }

    selectPriority(severityLevel) {
        if (severityLevel.selectable) {
            _forEach(this.severityObject.severityLevels, function(sev) {
                sev["selected"] = false;
            });
            severityLevel["selected"] = true;
            this.severity = severityLevel;
        }
    }

    submitSeverity() {
        this.dialogRef.close(this.severity);
    }
}