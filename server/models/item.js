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

// itemSchema definition
let itemSchema = new Schema({
  text: { type: String }
});

// exports itemSchema to use elsewhere
module.exports = itemSchema;
