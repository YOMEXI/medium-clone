import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { Observable, map } from 'rxjs';
import { CurrentUserInterface } from '../../shared/types/CurrentUser.interface';
import { environment } from '../../../environments/environment.development';
import { AuthResponse } from '../types/authResponse.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response: AuthResponse): CurrentUserInterface {
    return response.user;
  }

  getCurrentUser(): Observable<CurrentUserInterface> {
    return this.http
      .get<AuthResponse>(environment.baseUrl + '/users')
      .pipe(map(this.getUser));
  }
  register(data: RegisterRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponse>(environment.baseUrl + '/users', data)
      .pipe(map(this.getUser));
  }

  login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
    return this.http
      .post<AuthResponse>(environment.baseUrl + '/users/login', data)
      .pipe(map(this.getUser));
  }
}
