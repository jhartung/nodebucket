/*
============================================
; Title: Nodebucket (Week 2 - Sprint 1)
; Author: Professor Krasso
; Date: 20 August 2022
; Modified By: Joel Hartung
; Code Attribution: Observable
; URL: https://angular.io/guide/observables-in-angular
;===========================================
*/

// import statements
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// creates a SessionService which returns the appropriate employeeID for the session
export class SessionService {

  constructor(private http: HttpClient) { }

  /**
   * findEmployeeById API
   */
  findEmployeeById(employeeId: string): Observable<any> {
    return this.http.get('/api/employees/' + employeeId)
  }
}
