import { Component, OnInit } from '@angular/core';
import { PsnCookieService } from '../shared/services/psnCookieService';
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cookieService: PsnCookieService, private toastr: ToastrService) {}
  public currentLocale;
  ngOnInit() {
    this.currentLocale = this.cookieService.get("locale") ? this.cookieService.get("locale") : "En-Us";
  }

  changeLocale(locale) {
    this.cookieService.set("locale", locale);
    this.currentLocale = locale;
    this.toastr.success('Hello James S Miller!', 'You have changed the laguange to ' + locale);
  }
}
