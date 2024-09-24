import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../shared/constant.shared';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = API_BASE_URL + '/auth';
  constructor(private http:HttpClient) { }
  
  login(email:string, password:string):Observable<User> {
    return this.http.get<User>(this.apiUrl + 'login', {
      params: {
        email: email,
        password: password
      }
    });
  }
  register(user:User):Observable<User> {
    return this.http.post<User>(this.apiUrl + 'register', {
      params: {
        email: user.email,
        password: user.password,
        name: user.name
      }
    });
  }
}
