import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DzAnnouncementsComponent } from './dz-announcements.component';
import { Routes, RouterModule } from '@angular/router';

import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';


import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';
import { SharedPipesModule } from 'src/app/common/shared-pipes/shared-pipes.module';
import { DzEditAnnouncementComponent } from './dz-edit-announcement/dz-edit-announcement.component';
import { AnnouncementEditorComponent } from './announcement-editor/announcement-editor.component';
import { SharedLibAndCustomModule } from 'src/app/shared/shared-lib-and-custom.module';

const routes: Routes = [
  { path:'', component:DzAnnouncementsComponent ,pathMatch:"full"}
];

@NgModule({
  declarations: [DzAnnouncementsComponent,DzEditAnnouncementComponent,AnnouncementEditorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedPipesModule,
    SharedMatModule,
    SharedDatatableModule,
    DzControlsModule,
    SharedLibAndCustomModule
  ],
  entryComponents:[DzEditAnnouncementComponent]
})
export class AnnouncementsModule { }
