import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatacenterListComponent } from './datacenter-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CircleUiModule } from "../../../circle-ui/circle-ui.module"
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';

const routes: Routes = [
  {
    path:"", component: DatacenterListComponent
  }
]

@NgModule({
  declarations: [DatacenterListComponent],
  imports: [
    CommonModule,
    CircleUiModule,
    FlexLayoutModule,
    NgScrollbarModule,
    RouterModule.forChild(routes)
  ]
})
export class DatacenterListModule { }
