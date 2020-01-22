import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DzNotificationsComponent } from './dz-notifications.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { DzEditNotificationComponent } from './dz-edit-notification/dz-edit-notification.component';
const routes: Routes = [
  { path:'', component:DzNotificationsComponent }
];


@NgModule({
  declarations: [DzNotificationsComponent,DzEditNotificationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMatModule,
    SharedDatatableModule,
    DzControlsModule
  ],
  entryComponents:[DzEditNotificationComponent]
})
export class NotificationsModule { }
