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

  addUser(user: User) {
    console.log(user);
    return this.http.post('api/users', user);
  }

  login(value: any): Observable<any> {
    return this.http.post('api/login', value);
  }
}
