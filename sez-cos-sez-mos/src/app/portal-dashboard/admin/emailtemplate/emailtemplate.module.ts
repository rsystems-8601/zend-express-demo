import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailtemplateManagementRoutingModule } from './emailtemplate-routing.module';
import { SharedMatModule } from '../../../shared/shared-mat.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedDatatableModule } from '../../../shared/shared-datatable.module';
import { CosEmailtemplateManagementComponent } from './components/cos-emailtemplate-management.component';
import { CKEditorModule } from "ngx-ckeditor";
import { DzControlsModule } from 'src/app/dz-controls/dz-controls.module';

@NgModule({
  declarations: [CosEmailtemplateManagementComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    DzControlsModule,
    EmailtemplateManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedDatatableModule,
    CKEditorModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'})
  ],
  entryComponents:[]
})
export class EmailtemplatemanagementModule { }
