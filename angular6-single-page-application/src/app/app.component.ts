import { Component } from "@angular/core";
import * as $ from "jquery";
import { PsnCookieService } from './shared/services/psnCookieService';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  public currentLocale;
  constructor(private cookieService: PsnCookieService) {}
  ngOnInit() {
    this.currentLocale = this.cookieService.get("locale") ? this.cookieService.get("locale") : "En-Us";
  }

  changeLocale(locale) {
    this.cookieService.set("locale", locale);
    this.currentLocale = locale;
  }
}


