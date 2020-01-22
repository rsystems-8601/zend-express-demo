import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Angulartics2Module} from "angulartics2";
import {
  BsDropdownModule,
  DatepickerModule,
  ModalModule,
  TimepickerModule,
  TooltipModule,
  CarouselModule,
  TabsModule
} from "ngx-bootstrap";
import { DzSpinnerComponent } from '../common/dz-spinner/dz-spinner.component';
import { FlexModule } from '@angular/flex-layout';
@NgModule({
  declarations: [DzSpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Angulartics2Module.forRoot(),
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    DatepickerModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    TooltipModule.forRoot()
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Angulartics2Module,
    BsDropdownModule,
    DatepickerModule,
    ModalModule,
    TimepickerModule,
    TooltipModule,
    CarouselModule,
    TabsModule,
    FlexModule,
    DzSpinnerComponent
  ]
})
export class SharedLibAndCustomModule { }
