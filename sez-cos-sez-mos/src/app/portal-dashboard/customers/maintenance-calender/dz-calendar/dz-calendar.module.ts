import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DzCalendarComponent } from './dz-calendar.component';
import { TranslateModule } from '@ngx-translate/core';
import {  RouterModule } from '@angular/router';


@NgModule({
  declarations: [DzCalendarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  exports:[DzCalendarComponent]
})
export class DzCalendarModule { }
