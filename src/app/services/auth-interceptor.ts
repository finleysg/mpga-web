import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getTokenFromStorage();
    const request = !token ? req.clone() : req.clone({
      headers: req.headers.set('Authorization', `Token ${token}`)
    });
    return next.handle(request);
  }

  private getTokenFromStorage(): string {
    let token = localStorage.getItem('mpga-token');
    if (!token) {
      token = sessionStorage.getItem('mpga-token');
    }
    return token;
  }
}
