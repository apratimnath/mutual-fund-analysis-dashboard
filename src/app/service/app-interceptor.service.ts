import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/*
  This class intercepts all the outgoing HTTP Request and adds the neccessary headers -
  1. Content-Type
  2. jwtToken, if any
 */
export class AppInterceptorService implements HttpInterceptor {

  constructor() { }

  //Intercept interfaxe
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Content-Type
    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }
    //Authorization
    if (sessionStorage.getItem("jwtToken") && !req.url.endsWith(".json")) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer' + sessionStorage.getItem("jwtToken")) });
    }
    return next.handle(req);
  }
}
