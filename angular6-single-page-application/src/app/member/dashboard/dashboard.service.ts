import { Injectable } from "@angular/core";
import { PsnCookieService } from "../../shared/services/psnCookieService";

import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { EmptyObservable } from "rxjs/observable/EmptyObservable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class DashboardService {
  constructor(
    private _http: HttpClient,
    private psnCookieService: PsnCookieService
  ) {}

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      // "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    };
    return new HttpHeaders(headersConfig);
  }

  public languageLocaleMap = {
    "En-US": "en",
    "En-DE": "de"
  };

  getMyQuestions(assessmentID,setID,userId): Observable<any> {
    let locale = this.psnCookieService.get("locale")
      ? this.psnCookieService.get("locale")
      : "En-US";
    let language = this.languageLocaleMap[locale];
    let catchedError: any;
    return this._http
       .get(`http://10.131.10.109/Questions/${assessmentID}/${setID}/` + language + "/" + userId, {
       // .get("http://localhost/Api/Questions/1/" + language + "/" + userId, {
        headers: this.setHeaders()
      })
      .map(res => {
        if (res) {
          return res;
        }
        return [];
      })
      .catch((error: any) => (catchedError = error));
  }
/// Below method is not in use.
  getSubmittedResponse(userId, categoryId): Observable<any> {
   
    let catchedError: any;
    return this._http
      .get("http://10.131.10.109/QuestionAnswer/" + userId + "/" + categoryId, {
      //  .get("http://localhost/Api/QuestionAnswer/" + userId + "/" + categoryId, {
        headers: this.setHeaders()
      })
      .map(res => {
        if (res) {
          return res;
        }
        return [];
      })
      .catch((error: any) => (catchedError = error));
  }

  getMyReport(userId): Observable<any> {
   
    let catchedError: any;
    return this._http
      .get("http://10.131.10.109/Report/" + userId, {
      //  .get("http://localhost/Api/Report/" + userId, {
        headers: this.setHeaders()
      })
      .map(res => {
        if (res) {
          return res;
        }
        return [];
      })
      .catch((error: any) => (catchedError = error));
  }

  submitQuestionaire(body,mappings,assessmentID, set_ID, userId): Observable<any> {
    let prepareBody = JSON.stringify({
      UserId: userId,
      status: "ok",
      questions: body,
      mappings: mappings
    });

    let catchedError: any;
    return this._http
      .post(
        `http://10.131.10.109/Questions/Save/${assessmentID}/` + set_ID,
        //"http://localhost/Api/Questions/Save/" + categoryId,
        prepareBody,
        { headers: this.setHeaders() }
      )
      .map(res => {
        if (res) {
          return res;
        }
        return [];
      })
      .catch((error: any) => {
        if (error.status && error.error == "No Category Found") {
          return "d";
        }
        return error;
      });
  }
}
