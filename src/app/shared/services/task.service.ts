/*
============================================
; Title: Nodebucket (Week 3 - Sprint 2)
; Author: Professor Krasso
; Date: 22 August 2022
; Modified By: Joel Hartung
;===========================================
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  /**
   * findAllTasks
   */
  findAllTasks(employeeId: string): Observable<any> {
    return this.http.get('/api/employees' + employeeId + '/tasks');
  }


/**
 * createTask
 */
createTask(employeeId: string, task: string): Observable<any> {
  return this.http.post('/api/employees/' + employeeId + '/tasks', {
    text: task
  })
}

}
