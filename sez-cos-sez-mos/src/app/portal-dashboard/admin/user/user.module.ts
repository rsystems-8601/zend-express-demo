import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { DzEditUserComponent } from './dz-edit-user/dz-edit-user.component';
import { DzBatchCreateUsersComponent } from './dz-batch-create-users/dz-batch-create-users.component';
import { DzUserManagementComponent } from './dz-user-management.component';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { UserViewComponent } from './user-view.component';
import { TabedListModule } from '../../../common/tabed-list/tabed-list.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeleteUserComponent } from './delete-user/delete-user.component';


const routes: Routes = [
  {
    path: '', component: UserViewComponent,
    children: [
      {
        path: 'configure', component: DzUserManagementComponent
     },
     {
      path: 'configure/:id', component: DzEditUserComponent
    },
     {
       path: 'provision', component: DzEditUserComponent
     },
     {
      path:"", redirectTo: "configure"
    }
    ]
  }
];


@NgModule({
  declarations: [
    DzUserManagementComponent,
    DzEditUserComponent,
    DzBatchCreateUsersComponent,
    UserViewComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMatModule,
    ReactiveFormsModule,
    FormsModule,
    SharedDatatableModule,
    DzControlsModule,
    TabedListModule,
    FlexLayoutModule
  ],
  entryComponents:[
    DzEditUserComponent,
    DzBatchCreateUsersComponent,
    DeleteUserComponent
  ]
})
export class UserModule { }
