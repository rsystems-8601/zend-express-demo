import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DzTicketsComponent } from './dz-tickets.component';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DzMaintenanceViewerModule } from '../dz-maintenance-viewer/dz-maintenance-viewer.module';
import { DzMaintenanceConfirmComponent } from '../dz-maintenance-viewer/dz-maintenance-confirm/dz-maintenance-confirm.component';
import { SharedPipesModule } from 'src/app/common/shared-pipes/shared-pipes.module';
import { DzNoItemsComponent } from './dz-no-items/dz-no-items.component';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { DzTicketSeverityComponent } from './dz-ticket-severity/dz-ticket-severity.component';
import { DzNewTicketComments } from './dz-ticket-comments/dz-ticket-comments.component';
import { DzHelpDeskContactVerifier } from './dz-helpdesk-contact-verifyer/dz-helpdesk-contact-verifyer.component';
import { DzNewTicketCommentComponent } from './dz-ticket-comment-form/dz-ticket-comment-form.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { FlexModule } from '@angular/flex-layout';
import { DzTicketChangesConfirmationComponent } from './dz-ticket-cancel-changes/dz-ticket-changes-confirmation';
import { DzTicketSeverityViewerComponent } from './dz-ticket-severity/dz-ticket-severity-viewer/dz-ticket-severity-viewer.component';
import { CcEmailsValidator } from './dz-tickets-cc-emails-validator/dz-tickets-cc-emails.validator';
import { DzTicketsPaginationComponent } from './dz-tickets-pagination/dz-tickets-pagination';
const routes: Routes = [
  {path:"",component: DzTicketsComponent}
]

@NgModule({
  declarations: [
    DzTicketsComponent,
    DzNoItemsComponent,
    DzTicketSeverityComponent,
    DzNewTicketComments,
    DzHelpDeskContactVerifier,
    DzNewTicketCommentComponent,
    DzTicketChangesConfirmationComponent,
    DzTicketSeverityViewerComponent,
    CcEmailsValidator,
    DzTicketsPaginationComponent
  ],
  imports: [
    SharedMatModule,
    SharedPipesModule,
    DzControlsModule,
    RouterModule.forChild(routes),
    SharedLibAndCustomModule,
    VirtualScrollerModule 
  ],
  exports:[DzNewTicketComments],
  entryComponents:[DzTicketSeverityViewerComponent]
})
export class DzTicketsModule { }
