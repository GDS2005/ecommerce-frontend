import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserResults } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/v1/users';

  constructor(private http: HttpClient) { }

  getUsers(accessToken: string | null): Observable<UserResults> {
    console.log("token:", accessToken)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<UserResults>(this.apiUrl, { headers });
  }

  getUserById(accessToken: string | null, id: String): Observable<User> {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url, { headers });
  }

  createUser(accessToken: string | null, user: User): Observable<User> {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  updateUser(accessToken: string | null, id: String, user: User): Observable<User> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    console.log(user)
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<User>(url, user, { headers });
  }

  deleteUser(accessToken: string | null, id: String): Observable<void> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }
}
