import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivatevlanComponent } from './private-vlan.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { CosEdithardwareclusterComponent } from '../hardware-cluster/cos-save-edit-hardware-cluster/cos-edit-hardware-cluster.component';
import { CosEditPrivatevlanComponent } from './cos-save-edit-private-vlan/cos-edit-private-vlan.component';
import { DeletedialogvlanComponent } from './delete-private-vlan/deletedialog.component';

const routes: Routes = [
  {
    path:"",component:PrivatevlanComponent
  }
]

@NgModule({
  declarations: [PrivatevlanComponent,CosEditPrivatevlanComponent,DeletedialogvlanComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMatModule,
    SharedLibAndCustomModule,
    SharedDatatableModule
  ],
  entryComponents:[
    CosEditPrivatevlanComponent,
    DeletedialogvlanComponent
  ]
})
export class PrivateVlanModule { }
