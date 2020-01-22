import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DzMaintenanceViewerComponent } from './dz-maintenance-viewer.component';
import { DzMaintenanceConfirmComponent } from './dz-maintenance-confirm/dz-maintenance-confirm.component';
import { DzMaintenanceDeleteConfirmationComponent } from './dz-maintenance-delete-confirmation/dz-maintenance-delete-confirmation';
import { DzMaintenanceContentComponent } from './dz-maintenance-content/dz-maintenance-content.component';
import { DzMaintenanceFailReasonComponent } from './dz-maintenance-fail-reason/dz-maintenance-fail-reason.component';
import { DzTicketsModule } from '../dz-tickets/dz-tickets.module';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { RouterModule } from '@angular/router';
import { SharedPipesModule } from 'src/app/common/shared-pipes/shared-pipes.module';



@NgModule({
  declarations: [
    DzMaintenanceViewerComponent,
    DzMaintenanceConfirmComponent,
    DzMaintenanceDeleteConfirmationComponent,
    DzMaintenanceContentComponent,
    DzMaintenanceFailReasonComponent
  ],
  imports: [
    CommonModule,
    SharedMatModule,
    ReactiveFormsModule,
    FormsModule,
    DzControlsModule,
    NgScrollbarModule,
    DzTicketsModule,
    SharedLibAndCustomModule,
    RouterModule,
    SharedPipesModule
  ],
  entryComponents:[DzMaintenanceConfirmComponent],
  exports:[
    DzMaintenanceConfirmComponent
  ]
})
export class DzMaintenanceViewerModule { }
