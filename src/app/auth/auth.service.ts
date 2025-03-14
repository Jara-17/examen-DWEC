import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../core/models/apiResponse';
import { LoginDto, RegisterDto } from '../core/models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly TOKEN_KEY = 'token';
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  private get headers() {
    return new HttpHeaders({
      'apikey': this.apiKey,
      'Content-Type': 'application/json'
    });
  }

  login(credentials: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/v1/token?grant_type=password`,
      credentials,
      { headers: this.headers }
    ).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
      })
    );
  }

  register(user: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/auth/v1/signup`,
      user,
      { headers: this.headers }
    ).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.access_token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
