import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DzApplicationManagementComponent } from './dz-application-management.component';
import { DzEditApplicationComponent } from './dz-edit-application/dz-edit-application.component';

import { NgScrollbarModule } from 'ngx-scrollbar';

import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { ApplicationViewComponent } from './application-view.component';
import { TabedListModule } from '../../../common/tabed-list/tabed-list.module';


const routes: Routes = [
  {
    path: '', component: ApplicationViewComponent,
    children: [
      {
        path: 'configure', component: DzApplicationManagementComponent
     },
     {
      path: 'configure/:id', component: DzEditApplicationComponent
    },
     {
       path: 'provision', component: DzEditApplicationComponent
     },
     {
       path:"", redirectTo: 'configure'
     }
    ]
  }
];

@NgModule({
  declarations: [
    DzApplicationManagementComponent,
    DzEditApplicationComponent,
    ApplicationViewComponent
  ],
  imports: [
    CommonModule,
    SharedMatModule,
    DzControlsModule,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    TabedListModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[DzEditApplicationComponent]
})
export class ApplicationModule { }
