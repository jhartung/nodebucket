/*
============================================
; Title: Nodebucket (Week 2 - Sprint 1)
; Author: Professor Krasso
; Date: 20 August 2022
; Modified By: Joel Hartung
; Code Attribution: Interface
; URL: https://vegibit.com/how-to-use-an-interface-in-angular/
;===========================================
*/

import { Item } from './item.interface'; // imports Item interface

// sets and exports the employee interface
export interface Employee {
  employeeId: string;
  firstName: string;
  lastName: string;
  todo: Item[];
  done: Item[];
}

