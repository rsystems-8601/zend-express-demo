import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatGridListModule,
  MatRadioModule,
  MatStepperModule,
  MatTooltipModule
} from "@angular/material";
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
// import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
// import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
// import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
// import { DzFormComponent } from './dz-controls/dz-form/dz-form.component';
// import { DzAutocompleteComponent } from './dz-controls/dz-autocomplete/dz-autocomplete.component';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { ToastyModule } from 'ng2-toasty';
// import { DzPhoneInputComponent } from './dz-controls/dz-phone-input/dz-phone-input.component';
// import {TextMaskModule} from "angular2-text-mask";
// import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    // MatMomentDateModule,
    // MatMomentDatetimeModule,
    // MatDatetimepickerModule,
    MatGridListModule,
    MatRadioModule,
    MatStepperModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    // TranslateModule,
    // TextMaskModule,
    // CKEditorModule
  ],
  exports: [
        CommonModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        MatDialogModule,
        MatTableModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonToggleModule,
        MatIconModule,
        MatCardModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatListModule,
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
        MatExpansionModule,
        MatDatepickerModule,
        // MatMomentDateModule,
        // MatMomentDatetimeModule,
        // MatDatetimepickerModule,
        MatGridListModule,
        MatRadioModule,
        MatStepperModule,
        MatTooltipModule,
        // TextMaskModule,
        // DzFormComponent,
        // DzPhoneInputComponent,
        // DzAutocompleteComponent,
        ReactiveFormsModule,
        FormsModule,
        // TranslateModule,
        // CKEditorModule
  ],
  providers: [],
})
export class SharedMatModule { }
