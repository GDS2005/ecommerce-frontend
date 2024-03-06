import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'http://localhost:3000/v1/auth';
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string){
    return this.http.post<any>(`${this.apiUrl}/register`, { name, email, password });
  }

  saveTokens(tokens: any): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access.token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh.token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  logout() {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, '');
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    var refresh_token = this.getRefreshToken()
    this.http.post<any>(`${this.apiUrl}/logout`, { refresh_token });
    window.location.reload();
  }
}