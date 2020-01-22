import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppliancesComponent } from './appliances.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import {  AppliancesService } from './services/appliances.service';
import { AddapplienceComponent } from './add-appliances/add-appliance.component'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';



const routes: Routes = [
  {
      path:"", component: AddapplienceComponent,
    //   children:[
    //   {
    //     path:'add-appliances', component:AddapplienceComponent
    //   }
    // ]
 }
]

@NgModule({
  declarations: [AddapplienceComponent, AppliancesComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    SharedDatatableModule,
    RouterModule.forChild(routes)
  ],
  providers: [AppliancesService, {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}}]
})


export class AppliancesModule { }
