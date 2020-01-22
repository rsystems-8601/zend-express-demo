import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CosMasterconfigurationComponent } from './components/cos-masterconfiguration.component';

const routes: Routes = [
  { path:'', component:CosMasterconfigurationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterconfigurationRoutingModule { }


