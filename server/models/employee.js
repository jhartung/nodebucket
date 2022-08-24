/*
============================================
; Title: Nodebucket (Week 3 - Sprint 2)
; Author: Professor Krasso
; Date: 22 August 2022
; Modified By: Joel Hartung
; Code Attribution: Schemas
; URL: https://mongoosejs.com/docs/guide.html
;===========================================
*/


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./item');

// employeeSchema definition
let employeeSchema = new Schema({
  employeeId: {type: String, unique: true, required: true },
  firstName: {type: String},
  lastName: {type: String},
  todo: [itemSchema],
  done: [itemSchema]
}, { collection: 'employees'});

// exports employeeSchema to use elsewhere
module.exports = mongoose.model('Employee', employeeSchema);
