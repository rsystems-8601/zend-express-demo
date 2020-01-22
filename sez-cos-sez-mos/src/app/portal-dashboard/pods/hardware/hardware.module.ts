import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import { HardwareService } from './services/hardware.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddhardwareComponent } from './add-update-hardware/add-update-hardware.component';
import { HardwareComponent } from './hardware.component';
import { HardwareSwitchComponent } from './hardware-switch/hardware-switch.component';
import { HardwareServerComponent } from './hardware-server/hardware-server.component';
import { HardwareArrayComponent } from './hardware-array/hardware-array.component';

// import { DzDatepickerComponent } from 'src/app/dz-controls/dz-datepicker/dz-datepicker.component';
// import { DzDatepickerComponent } from '../dz-datepicker/dz-datepicker.component';

const routes: Routes = [

  { path:"", component: AddhardwareComponent },
  { path:'switch',  component:HardwareSwitchComponent },
  { path:'server',  component:HardwareServerComponent },
  { path:'array',  component:HardwareArrayComponent},
  { path:'switch/:id',  component:AddhardwareComponent},
  { path:'server/:id',  component:AddhardwareComponent},
  { path:'array/:id',  component:AddhardwareComponent}

]

@NgModule({
  declarations: [HardwareComponent, AddhardwareComponent, HardwareSwitchComponent, HardwareServerComponent, HardwareArrayComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    SharedDatatableModule,
    SharedDatatableModule,
    RouterModule.forChild(routes)
  ],
  providers: [HardwareService, {provide: MAT_DIALOG_DATA, useValue: {}}, 
    {provide: MatDialogRef, useValue: {}}]
})


export class HardwareModule { }
