import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerAssignmentComponent } from './customer-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedMatModule } from 'src/app/shared/shared-mat.module';
import { SharedDatatableModule } from 'src/app/shared/shared-datatable.module';
import {  CustomerAssignmentService } from './services/customer-assgnment.service';
import { CustomerAssignmentDetailsComponent } from './customer-assignment-details/customer-assignment-details.component';
import { DeletedialogCustomerassignmentComponent } from './customer-assignment-details/delete-customer-assignment/deletedialog.component';


const routes: Routes = [
  {
      path:"", component: CustomerAssignmentDetailsComponent,
    //   children:[
    //   {
    //     path:'details', component:CustomerAssignmentDetailsComponent
    //   }
    // ]
 }
]


@NgModule({
  declarations: [CustomerAssignmentDetailsComponent, CustomerAssignmentComponent, DeletedialogCustomerassignmentComponent],
  imports: [
    CommonModule,
    SharedMatModule,
    SharedDatatableModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[DeletedialogCustomerassignmentComponent],
  providers: [CustomerAssignmentService]
})


export class CustomerAssignmentModule { }
