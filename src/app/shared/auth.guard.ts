/*
============================================
; Title: Nodebucket (Week 2 - Sprint 1)
; Author: Professor Krasso
; Date: 20 August 2022
; Modified By: Joel Hartung
; Code Attribution: Injectable
; URL: https://angular.io/api/core/Injectable
; Code Attribution: Observable
; URL: https://angular.io/guide/observables-in-angular
; Code Attribution: Using Route Guards
; URL: https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
;===========================================
*/

// import statements
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// implements authorization only to registered employee IDs
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const sessionUser = this.cookieService.get('session_user');

    // navigates user to login page if the employee ID is not authorized
    if (sessionUser) {
      return true;
    } else {
    this.router.navigate(['/session/login']);
    return false;
    }
  }

}
