import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {OrganizationService} from "../../../../services/organization.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, of} from "rxjs";
import {DateUtils} from "../../../../common/date-utils";
import {AuthHolderService} from "../../../../services/auth-holder.service";
import {Announcement} from "../../../../models/announcement.model";
import {AnnouncementService} from "../../../../services/announcement.service";
import {DzValidators} from "../../../../common/dz-validators";

@Component({templateUrl: "./dz-edit-announcement.component.html"})
export class DzEditAnnouncementComponent {

    form: FormGroup;
    announcement: Announcement;
    preCreated: boolean=false;

    constructor(@Inject(MAT_DIALOG_DATA) announcement: Announcement,
                public dialogRef: MatDialogRef<DzEditAnnouncementComponent>,
                public organizationService: OrganizationService,
                public announcementService: AnnouncementService,
                public auth: AuthHolderService,
                public formBuilder: FormBuilder) {


        let announcement$: Observable<Announcement>;
    
        if (announcement) {
            announcement$ = of(announcement);
        } else {
            announcement$ = announcementService.preCreateAnnouncement();
            this.preCreated = true;
        }

        dialogRef.backdropClick().subscribe(() => this.cancel());

        announcement$.subscribe(announcement => {
            this.announcement = announcement;
            this.form = this.formBuilder.group({
                title: [announcement.title],
                startDate: [announcement.startDate],
                endDate: [announcement.endDate],
                organizations: [announcement.organizations]
            }, {
                validator: (form: FormGroup) => DzValidators.validateDateRange(form.controls.startDate, form.controls.endDate)
            });
        });
    }

    save() {
        let form = this.form.value;
        this.announcementService.updateAnnouncement(this.announcement.id, {
            title: form.title,
            startDate: DateUtils.formatDate(form.startDate),
            endDate: DateUtils.formatDate(form.endDate),
            organizationIds: this.auth.isOrganizationAdmin()
                ? [this.auth.getAuthentication().organizationId]
                : form.organizations.map(org => org.id),
            pages: this.announcement.pages
        }).spinner().subscribe(announcement => this.dialogRef.close(announcement));
    }

    cancel() {
        if (this.preCreated) {
            this.announcementService.deleteAnnouncement(this.announcement.id).subscribe(() => this.dialogRef.close())
        } else {
            this.dialogRef.close();
        }
    }
}