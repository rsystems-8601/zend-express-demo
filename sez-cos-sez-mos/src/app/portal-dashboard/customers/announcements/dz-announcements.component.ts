import { Component, OnInit } from '@angular/core';
import { DzEditAnnouncementComponent } from './dz-edit-announcement/dz-edit-announcement.component';
import { OrganizationService } from 'src/app/services/organization.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';
import { MatDialog, MatSortable } from '@angular/material';
import { Permission } from 'src/app/models/permission.model';
import { AbstractManagementTableComponent } from 'src/app/shared/abstarct-management-table.component';
import {Announcement} from "../../../models/announcement.model";
import { PageRequest } from 'src/app/models/page-request.model';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from 'src/app/models/page.model';
import { AnnouncementService } from 'src/app/services/announcement.service';
@Component({
  selector: 'app-dz-announcements',
  templateUrl: './dz-announcements.component.html',
  styleUrls: ['./dz-announcements.component.scss']
})
export class DzAnnouncementsComponent extends AbstractManagementTableComponent<Announcement> {

  columns = ["title", "startDate", "endDate", "organizations", "thumbnail", "actions"];
  protected editDialogComponent = DzEditAnnouncementComponent;

  readonly: boolean;

  constructor(public organizationService: OrganizationService,
              public announcementService: AnnouncementService,
              public auth: AuthHolderService,
              dialog: MatDialog) {
      super(dialog);

      //this.readonly = !auth.hasPermission(Permission.EDIT_ANNOUNCEMENTS);
      this.readonly=false;
      if (this.readonly) {
          this.removeColumn("actions");
      }
      if (auth.isOrganizationAdmin()) {
          //this.removeColumn("organizations");
      }
  }

  ngOnInit() {
      super.ngOnInit();
      this.sort.sort(<MatSortable>{
              id: 'startDate',
              start: 'desc'
          }
      );
  }

  openEditDialog(announcement?: Announcement) {
      super.openEditDialog(announcement, {width: "800px", disableClose: true});
  }

  protected getData(pageRequest: PageRequest, filters: any): Observable<Page<Announcement>> {
      return this.announcementService.getAnnouncements(pageRequest, filters);
  }

  protected deleteElement(element: Announcement): Observable<any> {
      return this.announcementService.deleteAnnouncement(element.id);
  }

}
