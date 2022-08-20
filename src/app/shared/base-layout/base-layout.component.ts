/*
============================================
; Title: Nodebucket (Week 2 - Sprint 1)
; Author: Professor Krasso
; Date: 20 August 2022
; Modified By: Joel Hartung
; Code Attribution: ngx-cookie-service
; URL: https://www.npmjs.com/package/ngx-cookie-service
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  sessionName: string;
  year: number;

  // sets the session name and date
  constructor(private cookieService: CookieService, private router: Router) {
    this.sessionName = this.cookieService.get('session_name');
    this.year = Date.now();
   }

  ngOnInit(): void {
  }

  // logout function deletes all cookies and navigates to login page
  logout() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/login'])
  }
}
