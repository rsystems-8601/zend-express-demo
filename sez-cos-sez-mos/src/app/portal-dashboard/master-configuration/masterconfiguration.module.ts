import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterconfigurationRoutingModule } from './masterconfiguration-routing.module';
import { CosMasterconfigurationComponent } from './components/cos-masterconfiguration.component';
import { SharedMatModule } from '../../shared-mat.module';
// import { CosEditMasterconfigurationComponent } from './components/cos-edit-masterconfiguration/cos-edit-masterconfiguration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedDatatableModule } from '../../shared/shared-datatable.module';


@NgModule({
  // declarations: [CosMasterconfigurationComponent,CosEditMasterconfigurationComponent],
  declarations: [CosMasterconfigurationComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    MasterconfigurationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedDatatableModule
  ],
  // entryComponents:[CosEditMasterconfigurationComponent]  
})
export class MasterconfigurationModule { }
