import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { UpdateappointmentComponent } from './updateappointment/updateappointment.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
	{path: 'home', component:HomeComponent },
	{path: 'employees', component:EmployeesComponent },
	{path: 'bookappointment', component:BookappointmentComponent },
	{path: 'updateappointment/:id', component:UpdateappointmentComponent },
	{path: '', redirectTo:'/home' , pathMatch : 'full' },
	{path: '**', component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
