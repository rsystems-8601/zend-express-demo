import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DzCheckboxComponent } from './dz-checkbox/dz-checkbox.component';
import { DzClickToEditContent, DzClickToEditComponent } from './dz-click-to-edit/dz-click-to-edit.component';
import { DzDateRangePickerComponent } from './dz-date-range-picker/dz-date-range-picker.component';
import { DzDatepickerComponent } from './dz-datepicker/dz-datepicker.component';
import { DzInputComponent } from './dz-input/dz-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';


import {BsDropdownModule, CarouselModule, DatepickerModule, ModalModule, TabsModule, TimepickerModule, TooltipModule} from "ngx-bootstrap";
import { DzFocus } from '../common/dz-focus';
import { DzAutocompleteComponent } from './dz-autocomplete/dz-autocomplete.component';
import { DzPhoneInputComponent } from './dz-phone-input/dz-phone-input.component';
import { SharedMatModule } from '../shared/shared-mat.module';
import { DzFormComponent } from './dz-form/dz-form.component';
import { DzCKEditorComponent } from './dz-ckeditor/dz-ckeditor.component';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  declarations: [
    DzCheckboxComponent,
    DzClickToEditContent,
    DzClickToEditComponent,
    DzDateRangePickerComponent,
    DzDatepickerComponent,
    DzInputComponent,    
    DzFocus,
    DzAutocompleteComponent,
    DzPhoneInputComponent,
    DzFormComponent,
    DzCKEditorComponent
  ],
  imports:[
    CommonModule,      
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    
    BsDropdownModule,
    CarouselModule, 
    DatepickerModule, 
    ModalModule, 
    TabsModule, 
    TimepickerModule, 
    TooltipModule,
    TextMaskModule,
    SharedMatModule,
    CKEditorModule
  ],
  exports:[
    DzCheckboxComponent,
    DzClickToEditContent,
    DzClickToEditComponent,
    DzDateRangePickerComponent,
    DzDatepickerComponent,
    DzInputComponent,
    DzCKEditorComponent,
    DzFocus,
    DzAutocompleteComponent,
    DzPhoneInputComponent,
    DzFormComponent
  ]
})
export class DzControlsModule { }
