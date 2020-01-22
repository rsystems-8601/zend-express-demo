import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DzMaintenanceCalenderComponent } from './dz-maintenance-calender.component';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DzCalendarModule } from './dz-calendar/dz-calendar.module';
const routes: Routes = [
  { path:'', component:DzMaintenanceCalenderComponent ,pathMatch:"full"},
  { path:'maintenance-calender', component:DzMaintenanceCalenderComponent }
];

@NgModule({
  declarations: [DzMaintenanceCalenderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    DzCalendarModule
  ]
})
export class MaintenanceCalenderModule { }
