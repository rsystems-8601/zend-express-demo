import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VirtualMachinesComponent } from './virtual-machines.component';
import { CosEditvirtualMachinesComponent } from './cos-save-edit-virtual-machines/cos-edit-virtual-machines.component';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { VmDeletedialogComponent } from './delete-virtual-machines/vm-deletedialog.component';



const routes:Routes = [
  {
    path:"",
    component:VirtualMachinesComponent,
   },
   { path:':id',  component:CosEditvirtualMachinesComponent}
]

@NgModule({
  declarations: [VirtualMachinesComponent,CosEditvirtualMachinesComponent,VmDeletedialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMatModule,
    SharedLibAndCustomModule,
    SharedDatatableModule
  ],
  entryComponents:[CosEditvirtualMachinesComponent,VmDeletedialogComponent]
})
export class VirtualMachinesModule { }
