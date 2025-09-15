
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from '../signup/singup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  // 👇 ahora la base apunta a /api/auth (para producción)
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private httpClient: HttpClient,
    public localStorage: LocalStorageService
  ) {}

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/signup`,
      signupRequestPayload,
      { responseType: 'text' }
    );
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/login`, loginRequestPayload)
      .pipe(
        map(data => {
          // Guardar tokens y datos en storage
          this.localStorage.store('authenticationtoken', data.authenticationToken);
          this.localStorage.store('username', data.username);
          this.localStorage.store('refreshtoken', data.refreshToken);
          this.localStorage.store('expiresat', data.expiresAt);

          this.loggedIn.emit(true);
          this.username.emit(data.username);

          return true;
        })
      );
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationtoken');
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    };

    // 👇 fix: usamos `${this.apiUrl}/refresh/token` que resuelve a
    // https://backend.../api/auth/refresh/token
    return this.httpClient.post<LoginResponse>(
      `${this.apiUrl}/refresh/token`,
      refreshTokenPayload
    ).pipe(
      tap(response => {
        // actualizar valores en storage
        this.localStorage.clear('authenticationtoken');
        this.localStorage.clear('expiresat');

        this.localStorage.store('authenticationtoken', response.authenticationToken);
        this.localStorage.store('expiresat', response.expiresAt);
      })
    );
  }

  logout() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    };

    this.httpClient.post(
      `${this.apiUrl}/logout`,
      refreshTokenPayload,
      { responseType: 'text' }
    ).subscribe({
      next: data => console.log('Logout exitoso', data),
      error: error => console.error('Error en logout', error)
    });

    // Limpiar storage
    this.localStorage.clear('authenticationtoken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshtoken');
    this.localStorage.clear('expiresat');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshtoken');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}