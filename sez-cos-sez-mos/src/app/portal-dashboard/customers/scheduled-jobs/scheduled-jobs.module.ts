import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DzScheduledJobsComponent } from './dz-scheduled-jobs.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';

import { SharedPipesModule } from 'src/app/common/shared-pipes/shared-pipes.module';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { DzEditScheduledJobComponent } from './dz-edit-scheduled-job/dz-edit-scheduled-job.component';
import { DzJobManagmentConfirmationComponent } from './dz-job-management-confirmation/dz-job-management-confirmation.component';
import { DzJobChangeFreezeConfirmationComponent } from './dz-job-changefreeze-confirmation/dz-job-changefreeze-confirmation.component';
import { DzJobApprovalResendMailConfirmationComponent } from './dz-edit-scheduled-job/dz-resend-approval-mail-confirmation/dz-resend-approval-mail-confirmation.component';
import { DzJobInactiveConfirmationComponent } from './dz-job-inactive-confirmation/dz-job-inactive-confirmation.component';



const routes: Routes = [
  { path:'', component:DzScheduledJobsComponent }
];


@NgModule({
  declarations: [DzScheduledJobsComponent,DzEditScheduledJobComponent,DzJobManagmentConfirmationComponent,
    DzJobChangeFreezeConfirmationComponent,DzJobApprovalResendMailConfirmationComponent,
    DzJobInactiveConfirmationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),    
    SharedMatModule,
    DzControlsModule,
    SharedDatatableModule,
    SharedPipesModule
  ],
  entryComponents:[
    DzEditScheduledJobComponent
  ]
})
export class ScheduledJobsModule { }
