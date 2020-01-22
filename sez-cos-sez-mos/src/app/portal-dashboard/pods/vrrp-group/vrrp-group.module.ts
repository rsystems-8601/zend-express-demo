import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VrrpgroupComponent } from './vrrp-group.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { DeletedialogvrrpComponent } from './delete-vrrp-group/deletedialog.component';

const routes: Routes = [
  {
    path:"",component:VrrpgroupComponent
  }
]

@NgModule({
  declarations: [VrrpgroupComponent,DeletedialogvrrpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMatModule,
    SharedLibAndCustomModule,
    SharedDatatableModule
  ],
  entryComponents:[
    DeletedialogvrrpComponent
  ]
})
export class VrrpGroupModule { }
