/*
============================================
; Title: Nodebucket (Week 4 - Sprint 3)
; Author: Professor Krasso
; Date: 2 September 2022
; Modified By: Joel Hartung
; Code Attribution: Dialog
; URL: https://material.angular.io/components/dialog/overview
;===========================================
*/

// import statements
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../models/dialog-data.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  dialogData: DialogData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.dialogData = data;
   }

  ngOnInit(): void {
  }

}
