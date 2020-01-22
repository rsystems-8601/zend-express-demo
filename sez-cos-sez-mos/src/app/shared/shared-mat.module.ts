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

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// import { ToastyModule } from 'ng2-toasty';

import {TextMaskModule} from "angular2-text-mask";
// import { AlertsModule } from 'angular-alert-module';

import { SharedPipesModule } from '../common/shared-pipes/shared-pipes.module';
import { HtmlThumbnailComponent } from '../portal-dashboard/customers/announcements/html-thumbnail/html-thumbnail.component';
import { CKEditorModule } from 'ngx-ckeditor';


@NgModule({
  declarations: [HtmlThumbnailComponent
  ],
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
        MatMomentDateModule,
        MatMomentDatetimeModule,
        MatDatetimepickerModule,
        MatGridListModule,
        MatRadioModule,
        MatStepperModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        TextMaskModule,
        CKEditorModule,
        SharedPipesModule
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
        MatMomentDateModule,
        MatMomentDatetimeModule,
        MatDatetimepickerModule,
        MatGridListModule,
        MatRadioModule,
        MatStepperModule,
        MatTooltipModule,
        TextMaskModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        CKEditorModule,
        HtmlThumbnailComponent
  ],

  providers: [],
})
export class SharedMatModule { 

}
