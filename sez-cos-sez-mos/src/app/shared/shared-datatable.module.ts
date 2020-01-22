import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { DataDialog } from './data-popup/data-dialog.component';
import { DataTableComponent } from './data-table/data-table.component';
import { SharedMatModule } from './shared-mat.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    DataTableComponent
    // DataDialog
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedMatModule
  ],
  exports: [
    // DataDialog,
    DataTableComponent
  ],
  entryComponents: []
  // entryComponents:[DataDialog]
})
export class SharedDatatableModule { }
