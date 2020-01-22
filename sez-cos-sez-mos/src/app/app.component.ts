import { Component, OnInit, ViewContainerRef, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Spinner } from './common/spinner';
import { Title } from '@angular/platform-browser';
import { ErrorService } from './services/error.service';
import { AuthHolderService } from './services/auth-holder.service';
import { MatDialog } from '@angular/material';
import { ToastyService } from 'ngx-toasty';
import { ReportErrorCreateRequest } from './models/user.model';
import { DzReportErrorComponent } from './common/dz-report-error/dz-report-error.component';
import { ReportErrorService } from './common/dz-report-error/report-error.service';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

import  html2canvas from 'html2canvas';
// declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Spinner = Spinner;
  title = 'c3-dizzion';
  constructor(private viewContainerRef: ViewContainerRef,
    private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    private translateService: TranslateService,
    titleService: Title,
    public errorService: ErrorService,
    public reportErrorService: ReportErrorService,
    public authHolder: AuthHolderService,
    private dialog: MatDialog,
    private toastyService: ToastyService,
    private _ngZone: NgZone){
    
      translateService.setDefaultLang("en");
        translateService.use("en");
        translateService.get("portal.name").subscribe(title => titleService.setTitle(title));

        (window as any).angularComponentRef = {
            zone: this._ngZone,
            captureScreenMethod: (apiUrl) => this.capture(apiUrl),
            component: this
          };
          // add this for start tracking
          angulartics2GoogleAnalytics.startTracking();

  }
  
  capture(apiUrl: string) {

    html2canvas(document.body, {
        scale: 0.8
      }).then(canvas => {
        let imageBase64 = canvas.toDataURL('image/png');
        this.reportErrorToBackend(imageBase64, apiUrl, window.location.href);
      });

}

    reportErrorToBackend(imgDataUri: string, apiUrl: string, frontEndUrl: string) {
      // let resp = this.errorService.getErrorInSession().json(); commented for ang 8
      let resp = this.errorService.getErrorInSession();
      let localizedMessage = "";
      let userEmailId = this.authHolder.getAuthentication().email;

      let errorRequest = new ReportErrorCreateRequest(imgDataUri, localizedMessage, resp.status + " : " + resp['MESSAGE'], resp['STACKTRACE'], resp['TIMESTAMP'], userEmailId, apiUrl, frontEndUrl);
      this.dialog.open(DzReportErrorComponent, {data: errorRequest, width: "450px"})
      .afterClosed()
      .subscribe((errorCreateRequest: ReportErrorCreateRequest)  => {
          if (errorCreateRequest) {
              this.reportErrorService.reportError(errorCreateRequest).spinner()
              .subscribe(() => {
                  this.translateService.get("reportError.msg.success")
                  .subscribe((msg) => this.toastyService.success(msg));
              }, () => {
                  this.translateService.get("reportError.msg.success")
                  .subscribe((msg) => this.toastyService.info(msg))
              });
          }
      });
  }

  ngOnDestroy() {
      (window as any).angularComponent = null;
  }
}
    

    