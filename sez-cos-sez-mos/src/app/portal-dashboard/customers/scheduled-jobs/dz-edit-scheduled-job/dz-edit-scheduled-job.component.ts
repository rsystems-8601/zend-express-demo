import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import {OrganizationService} from "../../../../services/organization.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {map} from 'rxjs/operators';
import {AuthHolderService} from "../../../../services/auth-holder.service";
import {DzValidators} from "../../../../common/dz-validators";
import {CronCollection, MaintenanceEventWithRecurrencePatterns} from "../../../../models/maintenance-event.model";
import {MaintenanceService, MaintenanceEventUpdateRequest, MaintenanceEventChangeFreezeCheck} from "../../../../services/maintenance.service";
import {TicketService} from "../../../../services/ticket.service";
import * as moment from "moment";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../../services/user.service";
import {DateUtils} from "../../../../common/date-utils";
import { Spinner } from "../../../../common/spinner";
import { DzJobChangeFreezeConfirmationComponent } from "../dz-job-changefreeze-confirmation/dz-job-changefreeze-confirmation.component";
import { DzJobManagmentConfirmationComponent } from "../dz-job-management-confirmation/dz-job-management-confirmation.component";

@Component({templateUrl: "./dz-edit-scheduled-job.component.html",
styles: [` .red{color: red;} .filename{min-height: 20px ; width: 300px; float:left; padding-left: 10px; background-color: cornsilk;margin-top: 5px;} `]})
export class DzEditScheduledJobComponent {
    MaintenanceType = MaintenanceService.MaintenanceType;
    Severity = MaintenanceService.Severity;

    form: FormGroup;
    job: MaintenanceEventWithRecurrencePatterns;
    availableCrons: CronCollection;
    recurrenceDate: number;
    cref: File[] = [];
    preCreated: boolean;
    attachmentUploadUrl: string;

    searchPortalAdmin = (name: string) => {
        return this.userService.portalAdminSearchFunction(name);
    };
    constructor(@Inject(MAT_DIALOG_DATA) job: MaintenanceEventWithRecurrencePatterns,
                public dialogRef: MatDialogRef<DzEditScheduledJobComponent>,
                public organizationService: OrganizationService,
                public userService: UserService,
                public maintenanceService: MaintenanceService,
                public ticketService: TicketService,
                public auth: AuthHolderService,
                public translateService: TranslateService,
                public formBuilder: FormBuilder,
                protected dialog: MatDialog) {

        let job$: Observable<MaintenanceEventWithRecurrencePatterns>;
        if (job) {
            job$ = of(job);
        } else {
            job$ = maintenanceService.preCreateMaintenanceEvent().pipe(map(job => MaintenanceEventWithRecurrencePatterns.from(job)));
            this.preCreated = true;
        }

        dialogRef.backdropClick().subscribe(() => this.cancel());

        job$.subscribe(job => {
            this.job = job;
            this.availableCrons = job.availableCrons;
            this.recurrenceDate = job.getRecurrenceDate();
            this.attachmentUploadUrl = maintenanceService.getAttachmentUploadUrlFor(job.id);
            this.form = this.formBuilder.group({
                title: [job.title],
                type: [{value: job.type, disabled: job.type === MaintenanceService.MaintenanceType.CHANGE_FREEZE }],
                message: [job.message],
                severity: [job.severity],
                startDateTime: [{value: job.startDateTime, disabled: job.organizations.length}],
                endDateTime: [job.endDateTime],
                repeat: [job.getCronDescription()],
                repeatUntil: [job.repeatUntil],
                reminder: [job.reminder],
                organizations: [job.organizations],
                assignedUser: [job.assignedUser],
                approvers: [job.approvers]
            }, {
                validator: (form: FormGroup) => {
                    DzValidators.validateDateRange(form.controls.startDateTime, form.controls.endDateTime, {granularity: "minute"});
                    DzValidators.validateDateRange(form.controls.startDateTime, form.controls.repeatUntil, {
                        errorKey: "invalidRepeatUntil",
                        exclusive: true
                    });
                    let repeatRequired = (form.value.type !== MaintenanceService.MaintenanceType.MAINTENANCE && form.value.type !== MaintenanceService.MaintenanceType.CHANGE_FREEZE) && form.value.repeat === CronCollection.NEVER;
                    form.controls.repeat.setErrors(repeatRequired && {"required": true});
                }
            });

            this.form.controls.type.valueChanges.subscribe((type) => {
                    if (type === MaintenanceService.MaintenanceType.MAINTENANCE) {
                        this.form.controls.repeatUntil.enable();
                    } else {
                        this.form.controls.repeatUntil.disable();
                    }

                }
            );
            this.form.controls.startDateTime.valueChanges.subscribe(startDateTime => {
                this.availableCrons = new CronCollection(startDateTime);
                this.recurrenceDate = moment(startDateTime).date();
                this.form.controls.repeat.setValue(CronCollection.NEVER);
            });
        });
    }

    save() {
        let form = this.form.value;
        let newCron = this.availableCrons.getCron(form.repeat);
        let translatedCronDescription = this.translateService.instant(form.repeat, {date: this.recurrenceDate});
        let cronChanged = newCron !== this.job.cron;

        let maintenanceEvent: MaintenanceEventUpdateRequest;
        maintenanceEvent = {
            title: form.title,
            type: form.type,
            message: form.message,
            severity: form.severity,
            startDateTime: moment(form.startDateTime || this.job.startDateTime).toISOString(),
            endDateTime: moment(form.endDateTime).toISOString(),
            cron: cronChanged ? newCron : this.job.cron,
            timezoneOffset: cronChanged ? DateUtils.getTimezoneOffset(moment()) : this.job.timezoneOffset,
            recurrencePatternName: cronChanged ? translatedCronDescription : this.job.getCronDescription(),
            repeatUntil: form.type === MaintenanceService.MaintenanceType.MAINTENANCE
                ? moment(form.repeatUntil).toISOString()
                : "",
            reminder: form.type === this.MaintenanceType.CHANGE_FREEZE ? false : form.reminder,
            organizationIds: this.auth.isOrganizationAdmin()
                ? [this.auth.getAuthentication().organizationId]
                : form.organizations.map(org => org.id),
            assignedUserId: form.assignedUser && form.assignedUser.id,
            approverIds: form.approvers.map(approvers => approvers.id),
            crefAttachment: this.cref
        }

        if (form.type === this.MaintenanceType.CHANGE_FREEZE) {
            // Check if events exists in between change freeze window to be created
            Spinner.show();
            this.maintenanceService.getAllActualScheduledJobsForOrganizations(moment(form.startDateTime), moment(form.endDateTime), maintenanceEvent.organizationIds)
            .subscribe(events => {
                if (events.length > 0) {
                    Spinner.hide();
                    let dialogRef = this.dialog.open(DzJobChangeFreezeConfirmationComponent, {data: events, width: "66%"});

                        dialogRef.afterClosed().subscribe((flag) => {
                            if (flag === true) {
                                this.updateMaintenanceEvent(this.job.id, maintenanceEvent);
                            }
                        })

                } else {
                    this.updateMaintenanceEvent(this.job.id, maintenanceEvent);
                }
            }, () => Spinner.hide());

        } else {
            // Check if change freeze exists between event/ event series to be created
            Spinner.show();
            this.maintenanceService.getMaintenanceEventInChangeFreeze(maintenanceEvent)
            .subscribe((maintenanceEventChangeFreezeCheck: MaintenanceEventChangeFreezeCheck) => {
                if (maintenanceEventChangeFreezeCheck.approvers && maintenanceEventChangeFreezeCheck.maintenanceEvents && maintenanceEventChangeFreezeCheck.organizations &&
                    (maintenanceEventChangeFreezeCheck.approvers.length > 0 || maintenanceEventChangeFreezeCheck.maintenanceEvents.length > 0
                    || maintenanceEventChangeFreezeCheck.organizations.length > 0)) {
                    Spinner.hide();
                    let dialogRef = this.dialog.open(DzJobManagmentConfirmationComponent, {data: maintenanceEventChangeFreezeCheck, width: "66%"});
                        dialogRef.afterClosed().subscribe((flag) => {
                            if (flag === true) {
                                this.updateMaintenanceEvent(this.job.id, maintenanceEvent, false, true);
                            } else if (flag === false) {
                                this.updateMaintenanceEvent(this.job.id, maintenanceEvent, true, false);
                            }
                        })
                } else {
                    // Spinner.hide();
                    this.updateMaintenanceEvent(this.job.id, maintenanceEvent);
                }
            }, () => Spinner.hide());
        }
    }

    updateMaintenanceEvent(jobId: number, maintenanceEvent: MaintenanceEventUpdateRequest, sendToApproval?: boolean, deleteInstanceFlag?: boolean) {
        if (!sendToApproval) {
            sendToApproval = false;
        }
        if (!deleteInstanceFlag) {
            deleteInstanceFlag = false;
        }
        if (!Spinner.isShown()) {
            Spinner.show();
        }
        // this.maintenanceService.updateMaintenanceEvent(this.job.id, maintenanceEvent).spinner().subscribe(job => this.dialogRef.close(job));
        this.maintenanceService.updateMaintenanceEvent(this.job.id, maintenanceEvent, sendToApproval, deleteInstanceFlag).subscribe(job => {
            this.dialogRef.close(job)
            Spinner.hide();
        }, () => Spinner.hide());
    }

    onFileChange(event: any) {
        this.cref.push(event.target.files[0]);
    }

    removeFile(index: number) {
        if (index !== -1) {
            this.cref.splice(index, 1);
        }
    }

    cancel() {
        if (this.preCreated) {
            this.maintenanceService.deleteMaintenanceEvent(this.job.id).subscribe(() => this.dialogRef.close())
        } else {
            this.dialogRef.close();
        }
    }
}

export class FileInput {
    constructor(public id: number, public fileName: string) {
    }
}