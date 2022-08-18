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

  errorMessages: Message[] = [];
  employee: Employee;

  loginForm: FormGroup = this.fb.group({
    employeeId: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])]
  })

  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, private sessionService: SessionService) {
    this.employee = {} as Employee;
  }

  ngOnInit(): void {
  }

  login() {
    const employeeId = this.loginForm.controls['employeeId'].value;

    console.log(employeeId);

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

      },
    })
  }
}
