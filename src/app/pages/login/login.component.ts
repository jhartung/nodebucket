/*
============================================
; Title: Nodebucket (Week 2 - Sprint 1)
; Author: Professor Krasso
; Date: 20 August 2022
; Modified By: Joel Hartung
; Code Attribution: ngx-session-service
; URL: https://www.npmjs.com/package/ngx-cookie-service
; Code Attribution: Message (PrimeNg)
; URL: http://primefaces.org/primeng/messages
;===========================================
*/

// import statements
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'primeng/api';
import { Employee } from 'src/app/shared/models/employee.interface';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // sets the error messages array to empty (Utilizes PrimNG messages for message service)
  errorMessages: Message[] = [];

  // assigns the employee variable to Employee schema
  employee: Employee;

  // adds validators to the loginForm. Ensures that only numerical values are accepted.
  loginForm: FormGroup = this.fb.group({
    employeeId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
  })

  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, private http: HttpClient, private sessionService: SessionService) {
    this.employee = {} as Employee;
  }

  ngOnInit(): void {
  }

  // login function checks entered employee ID against the mongo database
  login() {
    const employeeId = this.loginForm.controls['employeeId'].value;

    console.log(employeeId);

    // sets a session cookie that keeps the employee logged in for 1 day
    this.sessionService.findEmployeeById(employeeId).subscribe({
      next: (res) => {
        if (res) {
          this.employee = res;
          this.cookieService.set('session_user', this.employee.employeeId, 1);
          this.cookieService.set('session_name', `${this.employee.firstName} ${this.employee.lastName}`, 1);
          this.router.navigate(['/']);
        } else {
          this.errorMessages = [
            {
              severity: 'error',
              summary: 'Error',
              detail: 'Please enter a valid employee ID to continue.'
            }
          ]
        }
      },
      error: (e) => {
          console.log(e);
          this.errorMessages = [
            {
              severity: 'error',
              summary: 'Error',
              detail: e.message
            }
          ]
      }
    })
  }
}
