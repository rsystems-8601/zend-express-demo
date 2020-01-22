import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PodListComponent } from './pod-list.component';
import { CommonModule } from '@angular/common';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { CosEditPodTorswitchesComponent } from './cos-save-edit-pod-toswitches/cos-edit-pod.component';
import { CosEditPodtengbswitchesComponent } from './cos-save-edit-pod-tengbswitches/cos-edit-pod-tengbswitches.component';
import { CosEditPodipmiswitchesComponent } from './cos-save-edit-pod-ipmiswitches/cos-edit-pod-ipmiswitches.component';
import { CosEditPodserversComponent } from './cos-save-edit-pod-servers/cos-edit-pod-servers.component';
import { CosPodManagementComponent } from './pod-edit/cos-pod-management.component';
import { CosEditPodstorageComponent } from './cos-save-edit-pod-storage/cos-edit-pod-storage.component';

const routes: Routes = [

    {
      path:"", component:PodListComponent
    }

]


@NgModule({
  declarations: [
    PodListComponent,
    PodListComponent,
    CosEditPodTorswitchesComponent,
    CosEditPodtengbswitchesComponent,CosEditPodipmiswitchesComponent,CosEditPodserversComponent,
    CosEditPodstorageComponent,CosPodManagementComponent
  ],
  imports: [
    CommonModule,
    SharedLibAndCustomModule,
    SharedMatModule,
    SharedDatatableModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [CosPodManagementComponent]
})
export class PodListModule { }
