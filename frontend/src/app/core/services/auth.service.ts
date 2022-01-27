import { Injectable } from '@angular/core';
import {User} from "../../models/User";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post('api/auth/login-test', {email, password});
  }
  
  signup(username: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post('api/auth/signup-test', {username, email, password, confirmPassword});
  }
}
