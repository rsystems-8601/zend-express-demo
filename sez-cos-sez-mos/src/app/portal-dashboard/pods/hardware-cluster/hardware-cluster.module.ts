import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HardwareclusterComponent } from './hardware-cluster.component';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { CosEdithardwareclusterComponent } from './cos-save-edit-hardware-cluster/cos-edit-hardware-cluster.component';
import { DeletedialogComponent } from './delete-hardware-cluster/deletedialog.component';

const routes: Routes = [
  {
    path:"",component:HardwareclusterComponent
  },
  { path:':id',  component:CosEdithardwareclusterComponent}
]

@NgModule({
  declarations: [HardwareclusterComponent,CosEdithardwareclusterComponent,DeletedialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMatModule,
    SharedLibAndCustomModule,
    SharedDatatableModule
  ],
  entryComponents:[
    CosEdithardwareclusterComponent,
    DeletedialogComponent
  ]
})
export class HardwareClusterModule { }
