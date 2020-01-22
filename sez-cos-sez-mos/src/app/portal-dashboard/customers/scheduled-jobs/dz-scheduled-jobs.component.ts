import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractManagementTableComponent } from 'src/app/shared/abstarct-management-table.component';
import { MaintenanceEventWithRecurrencePatterns } from 'src/app/models/maintenance-event.model';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { DateUtils } from 'src/app/common/date-utils';
import { DzEditScheduledJobComponent } from './dz-edit-scheduled-job/dz-edit-scheduled-job.component';
import { MatSort, MatDialog, MatSortable } from '@angular/material';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from '../../admin/user/user.service';
import { TicketService } from 'src/app/services/ticket.service';
import { AuthHolderService } from 'src/app/services/auth-holder.service';
import { Permission } from 'src/app/models/permission.model';
import { PageRequest } from 'src/app/models/page-request.model';
import { Observable } from 'rxjs/internal/Observable';
import { DzJobApprovalResendMailConfirmationComponent } from './dz-edit-scheduled-job/dz-resend-approval-mail-confirmation/dz-resend-approval-mail-confirmation.component';
import { DzJobInactiveConfirmationComponent } from './dz-job-inactive-confirmation/dz-job-inactive-confirmation.component';
import { Page } from 'src/app/models/page.model';

@Component({
  selector: 'app-dz-scheduled-jobs',
  templateUrl: './dz-scheduled-jobs.component.html',
  styleUrls: ['./dz-scheduled-jobs.component.scss']
})
export class DzScheduledJobsComponent extends AbstractManagementTableComponent<MaintenanceEventWithRecurrencePatterns> {

  MaintenanceType = MaintenanceService.MaintenanceType;
  Severity = MaintenanceService.Severity;
  DateUtils = DateUtils;

  columns = ["approvalStatus", "title", "type", "thumbnail", "severity", "startDateTime", "endDateTime", "repeat", "repeatUntil",
      "reminder", "organizations", "assignedUser", "approvalTicketId", "actions"];
  protected editDialogComponent = DzEditScheduledJobComponent;

  readonly: boolean;

  APPROVAL_STATUS = {
      APPROVED: "APPROVED",
      PENDING: "PENDING",
      REJECTED: "REJECTED"
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public organizationService: OrganizationService,
              public userService: UserService,
              public ticketService: TicketService,
              public maintenanceService: MaintenanceService,
              public auth: AuthHolderService,
              dialog: MatDialog) {
      super(dialog);

      this.readonly = !auth.hasPermission(Permission.EDIT_MAINTENANCE_EVENTS);
      this.readonly = false;
      if (this.readonly) {
          this.removeColumn("actions");
      }
      if (auth.isOrganizationAdmin()) {
        //   this.removeColumn("organizations");
      }
      if (!auth.isPortalAdmin()) {
        //   this.removeColumn("approvalTicketId");
      }
  }

  ngOnInit() {
      super.ngOnInit();
      this.sort.sort(<MatSortable>{
              id: 'startDateTime',
              start: 'desc'
          }
      );
  }

  openEditDialog(job?: MaintenanceEventWithRecurrencePatterns) {
      super.openEditDialog(job, {width: "800px", disableClose: true});
  }

  protected getData(pageRequest: PageRequest, filters: any): Observable<Page<MaintenanceEventWithRecurrencePatterns>> {
      return this.maintenanceService.getMaintenanceEventsWithRecurrencePatterns(pageRequest, filters);
  }

  protected deleteElement(element: MaintenanceEventWithRecurrencePatterns): Observable<any> {
      return this.maintenanceService.deleteMaintenanceEvent(element.id);
  }

  resendApprovalEmail(job: MaintenanceEventWithRecurrencePatterns) {
      this.dialog.open(DzJobApprovalResendMailConfirmationComponent, {data: job, width: "650px"})
          .afterClosed()
          .subscribe(confirmed => {
              if (confirmed) {
                  this.maintenanceService.resendJobApprovalEmail(job.id)
                  .subscribe((result) => {
                      console.log(result);
                  })
              }
          });
  }

  inActiveJob(job: MaintenanceEventWithRecurrencePatterns) {
      let data = {message: 'jobInActiveConfirmation', params: {title: job.title}};
      this.dialog.open(DzJobInactiveConfirmationComponent, {data: job, width: "650px"})
          .afterClosed()
          .subscribe(confirmed => {
              if (confirmed) {
                  this.maintenanceService.inactiveMaintenanceEvent(job.id)
                  .subscribe((result) => {
                      console.log(result);
                  })
              }
          });
  }

}
