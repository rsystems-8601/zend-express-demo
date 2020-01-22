import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedMatModule } from '../shared/shared-mat.module';
import { DzControlsModule } from '../dz-controls/dz-controls.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    DzControlsModule,
    SharedMatModule
  ]
})
export class LoginModule { }
