/*
============================================
; Title: Nodebucket (Week 2 - Sprint 1)
; Author: Professor Krasso
; Date: 20 August 2022
; Modified By: Joel Hartung
; Code Attribution: Schemas
; URL: https://mongoosejs.com/docs/guide.html
;===========================================
*/


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// employeeSchema definition
let employeeSchema = new Schema({
  employeeId: {type: String, unique: true, required: true },
  firstName: {type: String},
  lastName: {type: String}
}, { collection: 'employees'});

// exports employeeSchema to use elsewhere
module.exports = mongoose.model('Employee', employeeSchema);
