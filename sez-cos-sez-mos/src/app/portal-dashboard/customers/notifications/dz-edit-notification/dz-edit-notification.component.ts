import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {OrganizationService} from "../../../../services/organization.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Notification} from "../../../../models/notification.model";
import {NotificationCreateUpdateRequest, NotificationService} from "../../../../services/notification.service";
import {DateUtils} from "../../../../common/date-utils";
import {AuthHolderService} from "../../../../services/auth-holder.service";
import {DzValidators} from "../../../../common/dz-validators";

@Component({templateUrl: "./dz-edit-notification.component.html"})
export class DzEditNotificationComponent {

    form: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public notification: Notification,
                public dialogRef: MatDialogRef<DzEditNotificationComponent>,
                public organizationService: OrganizationService,
                public notificationService: NotificationService,
                public auth: AuthHolderService,
                public formBuilder: FormBuilder) {

        this.form = this.formBuilder.group({
            title: [notification && notification.title],
            message: [notification && notification.message],
            startDate: [notification && notification.startDate],
            endDate: [notification && notification.endDate],
            organizations: [notification && notification.organizations]
        }, {
            validator: (form: FormGroup) => DzValidators.validateDateRange(form.controls.startDate, form.controls.endDate)
        });
    }

    save() {
        let form = this.form.value;
        let createUpdateRequest: NotificationCreateUpdateRequest = {
            title: form.title,
            message: form.message,
            startDate: DateUtils.formatDate(form.startDate),
            endDate: DateUtils.formatDate(form.endDate),
            organizationIds: this.auth.isOrganizationAdmin()
                ? [this.auth.getAuthentication().organizationId]
                : form.organizations.map(org => org.id)
        };
        let request$: Observable<Notification> = this.notification
            ? this.notificationService.updateNotification(this.notification.id, createUpdateRequest)
            : this.notificationService.saveNotification(createUpdateRequest);

        request$.spinner().subscribe(notification => this.dialogRef.close(notification));
    }
}