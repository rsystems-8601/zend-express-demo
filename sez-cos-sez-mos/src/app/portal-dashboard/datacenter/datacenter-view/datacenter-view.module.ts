import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatacenterViewComponent } from './datacenter-view.component';
import { Routes, RouterModule } from '@angular/router';

import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { TabedListModule } from 'src/app/common/tabed-list/tabed-list.module';


const routes: Routes = [
  {
    path:"", component: DatacenterViewComponent,
    children:[
      {
        path:"provision",
        loadChildren: () => import("../datacenter-provision/datacenter-provision.module").then(datacenterProvision => datacenterProvision.DatacenterProvisionModule)
      },
      // {
      //   loadChildren: () => import("../datacenter-list/datacenter-list.module").then(rec => rec.DatacenterListModule)
      // },
      {
        path:"configure",
        loadChildren: () => import("../datacenter-configure/datacenter-configure.module").then(con => con.DatacenterconfigureModule)
      }
    ]
  }
]

@NgModule({
  declarations: [DatacenterViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    MatTableModule,
    SharedMatModule,
    TabedListModule
  ]
})

export class DatacenterViewModule { }
