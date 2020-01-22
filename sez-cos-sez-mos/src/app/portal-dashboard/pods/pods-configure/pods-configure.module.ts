import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodsConfigureComponent } from './pods-configure.component';
import { Routes, RouterModule } from '@angular/router';
import { ConfigureTabsComponent } from './configure-tabs/configure-tabs.component';

import { SharedMatModule } from '../../../shared/shared-mat.module';

const routes: Routes = [
  {
    path: "", component: PodsConfigureComponent,
    children:[
      {
        path:"pod-details",loadChildren:()=> import("../pod-details/pods-details.module").then(m => m.PodsDetailsModule)
      },
      {
        path:"hardware",loadChildren:()=> import("../hardware/hardware.module").then(hardwarelist => hardwarelist.HardwareModule)
      },
      {
        path: 'virtual-machines', loadChildren:() => import("../virtual-machines/virtual-machines.module").then(m => m.VirtualMachinesModule)
      },
      {
        path:"pod-update",loadChildren:()=> import("../pods-create/pods-create.module").then(m => m.PodsCreateModule)
      },
      {
        path:"hardware-cluster", loadChildren:() => import("../hardware-cluster/hardware-cluster.module").then(m => m.HardwareClusterModule)
      },
      {
        path: 'private-vlan', loadChildren:() => import("../private-vlan/private-vlan.module").then(m => m.PrivateVlanModule)
      },
      {
        path:"vrrp-group", loadChildren:() => import("../vrrp-group/vrrp-group.module").then(m => m.VrrpGroupModule)
      },
      { path: "customer-assignment", loadChildren:()=> import("../../customer-assignment/customer-assignment.module").then(customer=>customer.CustomerAssignmentModule)},
    ]
  }
]

@NgModule({
  declarations: [PodsConfigureComponent, ConfigureTabsComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    RouterModule.forChild(routes)
  ]
})
export class PodsConfigureModule { }
