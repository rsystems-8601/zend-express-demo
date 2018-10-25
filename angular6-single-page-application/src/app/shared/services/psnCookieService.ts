import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class PsnCookieService {

  constructor(private _cookieService: CookieService) { }

  get(key) {
    return this._cookieService.get(key);
  }

  getAll() {
    return this._cookieService.getAll();
  }

  set(key, value) {
    this._cookieService.set(key, value);
  }

  delete(key) {
    this._cookieService.delete(key);
  }

  deleteAll() {
    this._cookieService.deleteAll();
  }

}
