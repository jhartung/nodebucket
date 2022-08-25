/*
============================================
; Title: Nodebucket (Week 3 - Sprint 2)
; Author: Professor Krasso
; Date: 24 August 2022
; Modified By: Joel Hartung
;===========================================
*/

// import statements
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee.interface';
import { Item } from 'src/app/shared/models/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from 'src/app/shared/services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  employee: Employee;
  todo: Item[];
  done: Item[];
  employeeId: string;

  taskForm: FormGroup = this.fb.group({
    task: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(35)])]
  })


  constructor(private fb: FormBuilder, private cookieService: CookieService, private taskService: TaskService) {
    this.employeeId = this.cookieService.get('session_user');
    this.employee = {} as Employee;
    this.todo = [];
    this.done = [];

    this.taskService.findAllTasks(this.employeeId).subscribe({
      next: (res) => {
        this.employee = res;
        console.log(this.employee);

      },
      error: (e) => {
        console.log(e.message);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
      }
    })
  }

  ngOnInit(): void {
  }

  createTask() {
    const newTask = this.taskForm.controls['task'].value;

    this.taskService.createTask(this.employeeId, newTask).subscribe({
      next: (res) => {
        this.employee = res;
        console.log(this.employee);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.todo = this.employee.todo;
        this.done = this.employee.done;
        this.taskForm.controls['task'].setErrors({'incorrect': false});
      }
    })
  }
}
