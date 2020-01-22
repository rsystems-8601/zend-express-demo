import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { PodDetailsComponent } from './pod-details.component';


const routes: Routes = [
  
    {
      path:"",component: PodDetailsComponent
    }
  
]


@NgModule({
  declarations: [
    PodDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedLibAndCustomModule,
    SharedMatModule,
    SharedDatatableModule,
    RouterModule.forChild(routes)
  ]
})
export class PodsDetailsModule { }
