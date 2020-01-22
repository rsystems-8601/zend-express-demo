import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CosCustomersManagementComponent } from './components/cos-customers-management.component';

const routes: Routes = [
  { path:'', component:CosCustomersManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }


