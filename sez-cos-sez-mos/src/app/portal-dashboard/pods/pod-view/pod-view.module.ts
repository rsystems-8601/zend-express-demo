import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodViewComponent } from './pod-view.component';
import { Routes, RouterModule } from '@angular/router';
import { TabedListComponent } from 'src/app/common/tabed-list/tabed-list.component';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { MatTabsModule } from '@angular/material';
import { TabedListModule } from 'src/app/common/tabed-list/tabed-list.module';


const routes: Routes = [
  {
    path:"", component: PodViewComponent,
    children:[
      {
        path:"configure",
        loadChildren:() => import("../pods-configure/pods-configure.module").then( m => m.PodsConfigureModule)
      },
      {
        path:"provision",
        loadChildren:() => import("../pods-provisions/pods-provisions.module").then(m=>m.PodsProvisionsModule)
      }
    ]
  }
]

@NgModule({
  declarations: [PodViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedLibAndCustomModule,
    SharedMatModule,
    MatTabsModule,
    TabedListModule
  ]
})

export class PodViewModule { }
