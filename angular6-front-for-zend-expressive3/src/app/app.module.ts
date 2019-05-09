import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewappointmentService } from './viewappointment.service';
import { HeaderpartComponent } from './headerpart/headerpart.component';
import { FooterpartpartComponent } from './footerpartpart/footerpartpart.component';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { UpdateappointmentComponent } from './updateappointment/updateappointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WINDOW_PROVIDERS } from "./window.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesComponent,
    PageNotFoundComponent,
    HeaderpartComponent,
    FooterpartpartComponent,
    BookappointmentComponent,
    UpdateappointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	FormsModule,
	ReactiveFormsModule
  ],
  providers: [
	ViewappointmentService,
	WINDOW_PROVIDERS 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
