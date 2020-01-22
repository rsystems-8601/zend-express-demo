import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalDashboardComponent } from './portal-dashboard.component';
import { PortalDashboardRoutningModule } from './portal-dashboard-routning.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ChartsModule } from 'ng2-charts';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedMatModule } from '../shared/shared-mat.module';
import { DzControlsModule } from '../dz-controls/dz-controls.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditsettingdialogComponent } from './header/edit-setting/editsettingdialog.component';


@NgModule({
  declarations: [
    PortalDashboardComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    EditsettingdialogComponent

  ],
  imports: [
    CommonModule,
    PortalDashboardRoutningModule,
    RouterModule,
    ChartsModule,
    DzControlsModule,
    FormsModule,
    ReactiveFormsModule,
    NgScrollbarModule,
    SharedMatModule,
    FlexLayoutModule

  ],
  entryComponents: [
    EditsettingdialogComponent
  ]

})
export class PortalDashboardModule { }
