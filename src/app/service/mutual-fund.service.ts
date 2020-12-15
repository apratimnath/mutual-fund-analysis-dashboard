import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MutualFundService {

  constructor(
    private http: HttpClient
  ) { }

  //Get the daily change data for landing dashboard
  getInitialData(): Observable<any> {
    return this.http.get(sessionStorage.getItem("backendBaseURL") + "/api/v1/connect-gspread", {
      observe: "response"
    }).pipe(
      map(
        (res) => {
          return new Object(res.body)
        })
    ).pipe(
      catchError((err) => {
        return this.handleAPIError(err);
      })
    );
  }

  //Handle all the errors
  handleAPIError(error: any) {
    let errObj = {};

    errObj["code"] = error.status;
    errObj["message"] = JSON.stringify(error["_body"]);

    return throwError(errObj);
  }
}
