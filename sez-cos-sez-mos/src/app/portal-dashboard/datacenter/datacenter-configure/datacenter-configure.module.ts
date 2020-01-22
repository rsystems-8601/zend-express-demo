import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatacenterconfigureComponent } from './datacenter-configure.component';
import { RouterModule, Routes } from '@angular/router';
import { InfrastructureTabsComponent } from './configure-tabs/configure-tabs.component';
import { SharedMatModule } from '../../../shared/shared-mat.module';
import { SharedDatatableModule } from '../../../shared/shared-datatable.module';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DataCenterdetailsComponent } from './datacenter-details/datacenter-details.component';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { UppercaseDirective } from 'src/app/shared/shared-directives/uppcaseDirective';

import { IpNetworksComponent } from './ip-networks/ip-networks.component';
import { DeleteIpNetworkComponent } from './ip-networks/delete-ip-network/delete-ip-network.component';
import { EditIpNetworkComponent } from './ip-networks/edit-ip-network/edit-ip-network.component';
import { AllocateIpNetworkComponent } from './ip-networks/edit-ip-network/allocate-ip-network/allocate-ip-network.component';
import { DeallocateIpNetworkComponent } from './ip-networks/edit-ip-network/deallocate-ip-network/deallocate-ip-network.component';
import { PodsModule } from '../../pods/pods.module';
import { PublicvlanComponent } from './public-vlan/public-vlan.component';
import { DeletedialogpublicvlanComponent } from './public-vlan/delete-public-vlan/deletedialog.component';
import { CosEditPublicvlanComponent } from './public-vlan/cos-save-edit-public-vlan/cos-edit-public-vlan.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path:"", component: DatacenterconfigureComponent,
    children:[
      {
        path:"datacenter-details",
        component: DataCenterdetailsComponent
      },
      {
        path: 'public-vlan', component: PublicvlanComponent
      },
      {
        path: 'ip-network', component: IpNetworksComponent,
      },
      {
        path: 'ip-network/:id', component: EditIpNetworkComponent,
      },
      {
        path:"pod-list", loadChildren:() => import("../../pods/pod-list/pod-list.module").then(m => m.PodListModule)
      },
      {
        path:"pod-list/:id", loadChildren:() => import("../../pods/pods-create/pods-create.module").then(m => m.PodsCreateModule)
      },
      {
        path:"",redirectTo:"datacenter-details"
      }
    ]

 }

]

@NgModule({
  declarations: [

        DatacenterconfigureComponent,
        DataCenterdetailsComponent,
        UppercaseDirective,
        IpNetworksComponent,
        DeleteIpNetworkComponent,
        EditIpNetworkComponent,
        AllocateIpNetworkComponent,
        DeallocateIpNetworkComponent,
        PublicvlanComponent,
        DeletedialogpublicvlanComponent,
        InfrastructureTabsComponent,
        CosEditPublicvlanComponent
  ],

  imports: [
    CommonModule,
    SharedMatModule,
    SharedDatatableModule,
    DzControlsModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    PodsModule,
  ],
  entryComponents: [
    DeleteIpNetworkComponent,
    EditIpNetworkComponent,
    AllocateIpNetworkComponent,
    DeallocateIpNetworkComponent,
    DeletedialogpublicvlanComponent,
    CosEditPublicvlanComponent
  ],
  providers: [{provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}]

})
export class DatacenterconfigureModule { }
