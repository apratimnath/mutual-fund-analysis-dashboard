import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PersonalFinanceService {

  constructor(
    private http: HttpClient
  ) { }

  //Register a new User and send mail
  registerNewUser(user: User) {
    return this.http.post(sessionStorage.getItem("backendBaseURL") + "/api/v1/register-user", user, {
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
