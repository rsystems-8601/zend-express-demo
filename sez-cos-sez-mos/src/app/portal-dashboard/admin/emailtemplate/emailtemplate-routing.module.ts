import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CosEmailtemplateManagementComponent } from './components/cos-emailtemplate-management.component';

const routes: Routes = [
  { path:'', component:CosEmailtemplateManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailtemplateManagementRoutingModule { }


