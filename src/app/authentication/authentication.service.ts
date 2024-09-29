import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../shared/constant.shared';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../shared/model.shared';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = API_BASE_URL + '/auth/';
  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }
  login(user: User): Observable<User> {
    return this.http
      .post<User>(this.apiUrl + 'login', {
        email: user.email,
        password: user.password,
      })
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      );
  }
  register(user: User): Observable<User> {
    return this.http
      .post<User>(this.apiUrl + 'register', {
        email: user.email,
        password: user.password,
        name: user.name,
        budget: user.budget,
      })
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
          return user;
        })
      );
  }
  logout() {
    localStorage.removeItem('currentUser');
  }
}
