import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { RouterModule, Routes } from '@angular/router';
import { DzOrganizationGroupManagementComponent } from './dz-organization-group-management.component';
import { DzEditOrganizationGroupComponent } from './dz-edit-organization-group/dz-edit-organization-group.component';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { ViewOrganizationGroupManagementComponent } from './view-organization-group-management.component';
import { TabedListModule } from '../../../common/tabed-list/tabed-list.module';

const routes: Routes = [
  {
    path: '', component: ViewOrganizationGroupManagementComponent,
    children: [
      {
        path: 'configure', component: DzOrganizationGroupManagementComponent
     },
     {
      path: 'configure/:id', component: DzEditOrganizationGroupComponent
    },
     {
       path: 'provision', component: DzEditOrganizationGroupComponent
     },
     {
       path:"", redirectTo:"configure"
     }
    ]
  }
];


@NgModule({
  declarations: [
    DzOrganizationGroupManagementComponent,
    DzEditOrganizationGroupComponent,
    ViewOrganizationGroupManagementComponent
  ],
  imports: [
    CommonModule,
    SharedMatModule,
    TabedListModule,
    DzControlsModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[
    DzEditOrganizationGroupComponent
  ]
})
export class OrganizationGroupModule { }
