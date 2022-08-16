// employee model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema({
  employeeId: {type: String, unique: true, required: true },
  firstName: {type: String},
  lastName: {type: String}
}, { collection: 'employees'});

// exports employeeSchema to use elsewhere
module.exports = mongoose.model('Employee', employeeSchema);
