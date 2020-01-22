import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CosPartnersManagementComponent } from './components/cos-partners-management.component';

const routes: Routes = [
  { path:'', component:CosPartnersManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnerManagementRoutingModule { }


