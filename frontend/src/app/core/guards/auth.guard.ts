import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {SubjectService} from "../services/subject.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private subjectService: SubjectService) { }
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {
      this.subjectService.getUser().subscribe((user) => {
        if (!user) {
          console.log('You don\'t have permission to access this page');
          return resolve(false);
        } else {
          return resolve(true);
        }
      });
    });
  }
  
}
