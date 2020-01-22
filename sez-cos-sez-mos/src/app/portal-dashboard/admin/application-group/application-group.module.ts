import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DzApplicationGroupManagementComponent } from './dz-application-group-management.component';
import { DzEditApplicationGroupComponent } from './dz-edit-application-group/dz-edit-application-group.component';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { ApplicationGroupViewComponent } from './application-group-view.component';
import { TabedListModule } from '../../../common/tabed-list/tabed-list.module';

const routes: Routes = [
  {
    path: '', component: ApplicationGroupViewComponent,
    children: [
      {
        path: 'configure', component: DzApplicationGroupManagementComponent
     },
     {
      path: 'configure/:id', component: DzEditApplicationGroupComponent
    },
     {
       path: 'provision', component: DzEditApplicationGroupComponent
     },
     {
      path:"", redirectTo: 'configure'
    }
    ]
  }
];


@NgModule({
  declarations: [
    DzApplicationGroupManagementComponent,
    DzEditApplicationGroupComponent,
    ApplicationGroupViewComponent
  ],
  imports: [
    CommonModule,
    SharedMatModule,
    DzControlsModule,
    FormsModule,
    TabedListModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  entryComponents: [DzEditApplicationGroupComponent]
})
export class ApplicationGroupModule { }
