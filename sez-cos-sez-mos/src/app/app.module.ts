import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { AppRoutingModule, appRoutingProviders } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastyModule } from 'ngx-toasty';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CookieService } from 'ngx-cookie-service';



import { MatStepperComponent } from './common/mat-stepper/mat-stepper.component';


import { LineChartComponent } from './common/chart/line-chart/line-chart.component';
import { BarChartComponent } from './common/chart/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './common/doughnut-chart/doughnut-chart.component';
import { BubbleChartComponent } from './common/chart/bubble-chart/bubble-chart.component';
import { ThemeComponent } from './theme/theme.component';
import { SharedMatModule } from './shared/shared-mat.module';
import { CustomErrorStateMatcher } from './shared/customErrorStateMatcher';

import { TextMaskModule } from 'angular2-text-mask';

import { DzDeleteConfirmationManagementComponent } from './shared/delete-confirmation/dz-delete-confirmation-management.component';
import { FocusedBorder, Wave } from './common/material.directives';

import { DzControlsModule } from './dz-controls/dz-controls.module';
import { SharedLibAndCustomModule } from './shared/shared-lib-and-custom.module';
import { DzReportErrorComponent } from './common/dz-report-error/dz-report-error.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { CommonInterceptor } from './helper/common.interceptor';


export function translateLoaderFactory(http: any) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

@NgModule({

  declarations: [
    AppComponent,
    Wave,
    // SafeHtmlPipe,
    FocusedBorder,
    MatStepperComponent,
    LineChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    BubbleChartComponent,
    ThemeComponent,
    DzDeleteConfirmationManagementComponent,
    DzReportErrorComponent,
    // HeaderComponent,
    // SidebarComponent,
    // DatacenterComponent,
    // BreadcrumbComponent
    LoaderComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    ChartsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    ToastyModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    DzControlsModule,
    TextMaskModule,
    SharedMatModule,
    FlexLayoutModule,
    NgScrollbarModule,
    DzControlsModule,
    SharedLibAndCustomModule
  ],

  entryComponents: [
    DzDeleteConfirmationManagementComponent
  ],

  providers: [
    TranslateService,
    appRoutingProviders,
    CustomErrorStateMatcher,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CommonInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent],

  exports: [SharedMatModule]

})
export class AppModule { }




