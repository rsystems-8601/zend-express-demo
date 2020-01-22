import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { PcvdcComponent } from './pcvdc.component';
import { AddpcvdcComponent } from './add-update-pcvdc/add-update-pcvdc.component';
import { PcvdcService } from './services/pcvdc.service';

// import { DzDatepickerComponent } from 'src/app/dz-controls/dz-datepicker/dz-datepicker.component';
// import { DzDatepickerComponent } from '../dz-datepicker/dz-datepicker.component';

const routes: Routes = [

  { path:"", component: AddpcvdcComponent },
  // { path:'switch',  component:HardwareSwitchComponent },
  // { path:'server',  component:HardwareServerComponent },
  // { path:'array',  component:HardwareArrayComponent},
  // { path:'switch/:id',  component:AddhardwareComponent},
  // { path:'server/:id',  component:AddhardwareComponent},
  // { path:'array/:id',  component:AddhardwareComponent}

]

@NgModule({
  declarations: [PcvdcComponent, AddpcvdcComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    SharedDatatableModule,
    SharedDatatableModule,
    RouterModule.forChild(routes)
  ],
  providers: [PcvdcService, {provide: MAT_DIALOG_DATA, useValue: {}}, 
    {provide: MatDialogRef, useValue: {}}]
})


export class PcvdcModule { }
