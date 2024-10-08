import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserResults } from '../../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `http://${environment.env}:3001/v1`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserResults> {
    return this.http.get<UserResults>(this.apiUrl);
  }

  getUserById(id: String): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<User>(url);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: String, user: User): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<User>(url, user)
  }

  deleteUser(id: String): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
