import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { catchError, switchMap, take, filter } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response.payload';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    // ❌ No añadir token en signup/login/refresh
    if (req.url.includes('/auth/login') || req.url.includes('/auth/signup') || req.url.includes('/auth/refresh/token')) {
      return next.handle(req);
    }

    const jwtToken = this.authService.getJwtToken();

    if (jwtToken) {
      return next.handle(this.addToken(req, jwtToken)).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
            // Token expirado → intentar refresh
            return this.handleAuthErrors(req, next);
          } else {
            return throwError(() => error);
          }
        })
      );
    }

    return next.handle(req);
  }

  private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {

    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((refreshTokenResponse: LoginResponse) => {
          this.isTokenRefreshing = false;
          this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);

          // 🚀 Guardar nuevo token
          this.authService.localStorage.store('authenticationtoken', refreshTokenResponse.authenticationToken);
          this.authService.localStorage.store('expiresat', refreshTokenResponse.expiresAt);

          return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
        }),
        catchError(err => {
          this.isTokenRefreshing = false;
          // 🔴 podría forzar logout si el refresh falla
          this.authService.logout();
          return throwError(() => err);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(jwt => next.handle(this.addToken(req, jwt)))
      );
    }
  }

  addToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
    });
  }
}