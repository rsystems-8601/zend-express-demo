import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodsProvisionsComponent } from './pods-provisions.component';
import { Routes, RouterModule } from '@angular/router';
import { ProvisionTabsComponent } from './provision-tabs/provision-tabs.component';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';



const routes: Routes = [
  {
    path:"",component: PodsProvisionsComponent,
    children: [
      { path: "appliances", loadChildren:()=> import("../../appliances/appliances.module").then(appliances=>appliances.AppliancesModule)},
      { path: "hardware", loadChildren:()=> import("../hardware/hardware.module").then(hardwareCreate=>hardwareCreate.HardwareModule)},
      { path: "import-pcvdc", loadChildren:()=> import("../import-pcvdc/pcvdc.module").then(pcdvc=>pcdvc.PcvdcModule)},
    ]
  }
]

@NgModule({
  declarations: [PodsProvisionsComponent, ProvisionTabsComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    RouterModule.forChild(routes)
  ]
})
export class PodsProvisionsModule { }
