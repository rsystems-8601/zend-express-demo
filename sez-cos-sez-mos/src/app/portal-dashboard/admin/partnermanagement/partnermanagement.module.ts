import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerManagementRoutingModule } from './partnermanagement-routing.module';
import { CosPartnersManagementComponent } from './components/cos-partners-management.component';
import { SharedMatModule } from '../../../shared/shared-mat.module';
import { CosEditPartnerComponent } from './components/cos-edit-partners/cos-edit-partner.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedDatatableModule } from '../../../shared/shared-datatable.module';
import { DeletedialogComponent } from './components/delete-partner/deletedialog.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';

@NgModule({
  declarations: [CosPartnersManagementComponent,CosEditPartnerComponent, DeletedialogComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    PartnerManagementRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,
    SharedDatatableModule,
    DzControlsModule
  ],
  entryComponents:[CosEditPartnerComponent, DeletedialogComponent]
})
export class PartnerManagementModule { }
