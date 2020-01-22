import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DzOrganizationManagementComponent } from './dz-organization-management.component';
import { DzEditOrganizationComponent } from './dz-edit-organization/dz-edit-organization.component';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { OrganizationViewComponent } from './organization-view/organization-view.component';
import { TabedListModule } from 'src/app/common/tabed-list/tabed-list.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteOrganizationComponent } from './delete-organization/delete-organization.component';

// const routes: Routes = [
//   {path:"", component:DzOrganizationManagementComponent}
// ]
const routes: Routes = [
  {
    path: '', component: OrganizationViewComponent,
    children: [
      {
        path: 'configure', component: DzOrganizationManagementComponent
     },
     {
      path: 'configure/:id', component: DzEditOrganizationComponent
    },
     {
       path: 'provision', component: DzEditOrganizationComponent
     },
     {
       path:"", redirectTo: "configure"
     }
    ]
  }
];

@NgModule({
  declarations: [
    DzOrganizationManagementComponent,
    DzEditOrganizationComponent,
    OrganizationViewComponent,
    DeleteOrganizationComponent
  ],
  imports: [
    CommonModule,
    SharedMatModule,
    FormsModule,
    DzControlsModule,
    ReactiveFormsModule,
    SharedDatatableModule,
    RouterModule.forChild(routes),
    TabedListModule,
    FlexLayoutModule

  ],
  entryComponents:[DzEditOrganizationComponent,DeleteOrganizationComponent]
})
export class OrganizationModule { }
