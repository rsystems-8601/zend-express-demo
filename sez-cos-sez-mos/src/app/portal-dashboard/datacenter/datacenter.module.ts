import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatacenterListModule } from './datacenter-list/datacenter-list.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DatacenterListModule,
    MatButtonToggleModule
  ]
})
export class DatacenterModule { }
