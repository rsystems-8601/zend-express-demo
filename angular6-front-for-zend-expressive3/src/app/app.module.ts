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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeesComponent,
    PageNotFoundComponent,
    HeaderpartComponent,
    FooterpartpartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule
  ],
  providers: [
	ViewappointmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
