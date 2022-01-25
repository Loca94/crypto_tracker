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

  login(value: any): Observable<any> {
    return this.http.post('api/login', value);
  }
  
  register(value: any): Observable<any> {
    return this.http.post('api/register', value);
  }
}
