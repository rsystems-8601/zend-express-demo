/** C3Provisioning List Component */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { C3ProvisioningListComponent } from './c3-provisioning-list.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';

const routes: Routes = [
  {
    path:"", component: C3ProvisioningListComponent
  }
]

@NgModule({
  declarations: [C3ProvisioningListComponent],
  imports: [
    CommonModule,
    SharedDatatableModule,
    SharedMatModule,
    RouterModule.forChild(routes)
  ]
})
export class C3ProvisioningListModule { }
