import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {User} from "../../models/User";
import {CoinMonitored} from "../../models/CoinMonitored";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private userSubject = new BehaviorSubject<User>(null);

  constructor() { }
  
  setUser(user: User): void {
    this.userSubject.next(user);
  }
  getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }
}
