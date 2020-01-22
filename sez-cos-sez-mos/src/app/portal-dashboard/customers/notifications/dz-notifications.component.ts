import { Component, OnInit } from '@angular/core';
import { AbstractManagementTableComponent } from 'src/app/shared/abstarct-management-table.component';
import { DzEditNotificationComponent } from './dz-edit-notification/dz-edit-notification.component';
import { OrganizationService } from 'src/app/services/organization.service';
import { NotificationService } from 'src/app/services/notification.service';
import {Notification} from "../../../models/notification.model";
import { AuthHolderService } from 'src/app/services/auth-holder.service';
import { MatDialog, MatSortable } from '@angular/material';
import { Permission } from 'src/app/models/permission.model';
import { PageRequest } from 'src/app/models/page-request.model';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-dz-notifications',
  templateUrl: './dz-notifications.component.html',
  styleUrls: ['./dz-notifications.component.scss']
})

export class DzNotificationsComponent extends AbstractManagementTableComponent<Notification> {

  columns = ["title", "message", "startDate", "endDate", "organizations", "actions"];
  protected editDialogComponent = DzEditNotificationComponent;

  readonly: boolean;

  constructor(public organizationService: OrganizationService,
              public notificationService: NotificationService,
              public auth: AuthHolderService,
              dialog: MatDialog) {
      super(dialog);

      //this.readonly = !auth.hasPermission(Permission.EDIT_NOTIFICATIONS);
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

  protected getData(pageRequest: PageRequest, filters: any): Observable<Page<Notification>> {
      return this.notificationService.getNotifications(pageRequest, filters);
  }

  protected deleteElement(element: Notification): Observable<any> {
      return this.notificationService.deleteNotification(element.id);
  }
}
