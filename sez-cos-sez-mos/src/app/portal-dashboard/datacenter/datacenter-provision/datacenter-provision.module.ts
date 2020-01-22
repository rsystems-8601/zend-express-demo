import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedDatatableModule } from '../../../shared/shared-datatable.module';

import { DatacenterProvisionComponent } from './datacenter-provision.component';
import { RouterModule, Routes } from '@angular/router';
import { ProvisionTabsComponent } from './provision-tabs/provision-tabs.component';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { IpNetworkComponent } from './ip-network/ip-network.component';
import { PodsModule } from '../../pods/pods.module';
import { CreatePublicVlanComponent } from './create-public-vlan/create-public-vlan.component';
import { FlexLayoutModule } from '@angular/flex-layout';




const routes: Routes = [
  {
    path:"", component: DatacenterProvisionComponent,
    children:[
      {
        path:"public-vlan", component: CreatePublicVlanComponent
      },
      {
          path:'ip-network', component:IpNetworkComponent
        },

      {
        path:"provision-pod",loadChildren: () => import("../../pods/pods-create/pods-create.module").then(m => m.PodsCreateModule)
      },
      {
        path:"", redirectTo:"provision-pod"
      }
    ]
  }
]

@NgModule({
  declarations: [
    DatacenterProvisionComponent,
    // InfrastructureTabsComponent,
    CreatePublicVlanComponent,
    ProvisionTabsComponent,
    IpNetworkComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    FlexLayoutModule,
    SharedDatatableModule,
    PodsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
  ]
})
export class DatacenterProvisionModule { }
