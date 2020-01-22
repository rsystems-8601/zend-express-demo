import {Component, Inject, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Location} from "@angular/common";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {DzTicketSeverityViewerComponent} from "./dz-ticket-severity-viewer/dz-ticket-severity-viewer.component"

import {TranslateService} from "@ngx-translate/core";

import { findLast as _findLast,
         cloneDeep as _cloneDeep } from "lodash";
import { SeverityInfo, SeverityInfoObject } from 'src/app/models/ticket.model';
import { TicketService } from '../ticket.service';

@Component({
    selector: "dz-ticket-severity",
    templateUrl: "./dz-ticket-severity.component.html",
    styleUrls: ["./dz-ticket-severity.component.scss"]
})

export class DzTicketSeverityComponent implements OnInit {

    @Input() severity: string;
    @Input() impact: string;
    @Input() compareWith = (oldVal, newVal) => oldVal === newVal;
    @Output() severityChange: EventEmitter<string> = new EventEmitter<string>();
    @Output() impactChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() required: boolean;
    @Input() placeholder: string;
    @Input() showPriority: boolean;

    severityInfo: SeverityInfo;
    displaySeverity: string;
    displayPriority: string;
    severityInfoObject: SeverityInfoObject;

    severityLevels;

    constructor(private dialog: MatDialog,
                private translatorService: TranslateService,
                private ticketService: TicketService) {
        if (this.severity && this.impact) {
            this.displaySeverity = this.translatorService.instant(this.impact) + "/" + this.translatorService.instant(this.severity);
        }
        this.severityLevels = _cloneDeep(ticketService.severityLevelsArray);
    }
    ngOnInit(): void {
        if (this.showPriority == null) {
            this.showPriority = true;
        }
        if (this.severity && this.impact) {
            this.displaySeverity = this.translatorService.instant(this.impact) + "/" + this.translatorService.instant(this.severity);
            let sev = this.severity;
            let imp = this.impact;

            let currentSeverity = _findLast(this.severityLevels, function(severity) {
                return severity.impact == imp && severity.urgency == sev
            });
            this.displayPriority = currentSeverity.text;
        }
    }

    openDialog() {
        this.severityInfo = {
            impact : this.impact,
            urgency: this.severity
        };

        this.severityInfoObject = {
            severityInfo: this.severityInfo,
            severityLevels: this.severityLevels 
        };

        const dialogRef = this.dialog.open(DzTicketSeverityViewerComponent, {data: this.severityInfoObject, width: "650px"});
        dialogRef
            .afterClosed()
            .subscribe((result) => {
                if (result) {
                    this.severity = result.urgency;
                    this.impact = result.impact;
                    this.severityChange.emit(this.severity);
                    this.impactChange.emit(this.impact);
                    this.displaySeverity = this.translatorService.instant(this.impact) + "/" + this.translatorService.instant(this.severity);
                    this.displayPriority = result.text;
                }
            });
    }

    getTranslation(key: string) {
        return this.translatorService.instant(key);
    }
}