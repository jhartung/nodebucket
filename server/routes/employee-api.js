/*
============================================
; Title: Nodebucket (Week 2 - Sprint 1)
; Author: Professor Krasso
; Date: 20 August 2022
; Modified By: Joel Hartung
; Code Attribution: OpenAPI Specifications
; URL: https://swagger.io/specification/
; Code Attribution: db.collection.findOne
; URL: https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
; Code Attribution: Try... Catch
; URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
;===========================================
*/

// require statements
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// YAML code to describe the findEmployeesById API
/**
 * findEmployeeById
 * @openapi
 * /api/employees/{employeeId}:
 *   get:
 *     tags:
 *       - Employees
 *     description:  API for returning employees by employeeId
 *     summary: returns employee by employeeId
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *         description: Employee document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee document
 *       '401':
 *         description: Invalid employeeId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */

// API specifications
router.get('/employees/:employeeId', async(req, res) => {
  try {
    // finds the employee by employee ID, or returns an error message
    Employee.findOne({'employeeId': req.params.employeeId}, function(err, employee) {
      if (err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDb Server Error: ' + err.message
        })
      } else {
        console.log(employee);
        res.json(employee);
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).send({
      'err': 'Internal server error!'
    })
  }
})

/**
 * findAllTasks
 */

router.get('/employees/:employeeId/tasks', async(req, res) => {
  try {
    Employee.findOne({'employeeId': req.params.employeeId}, 'employeeId todo done', function(err, emp) {
      if(err) {
        console.log(err);
        res.status(501).send({
          'err': 'MongoDB server error: ' + err.message
        })
      } else {
        console.log(emp);
        res.json(emp);
      }
    })
  } catch(e) {
    console.log(e);
    res.status(500).send({
      'err': 'Internal server error: ' + e.message
    })
  }
})

/**
 * createTask
 */

router.post('/employees/:employeeId/tasks', async(req, res) => {
  try {
    Employee.findOne({'employeeId': req.params.employeeId}, function(err, emp) {
      if (err) {
        console.log(err);
          res.status(501).send({
            'err': 'MongoDB server error: ' + err.message
          })
      } else {
        console.log(emp);
        const newTask = {
          text: req.body.text
        }

        emp.todo.push(newTask);

        emp.save(function(err, updatedEmp) {
          if (err) {
            console.log(err);
            res.status(501).send({
              'err': 'MongoDB server error: ' + err.message
            })
          } else {
            console.log(updatedEmp);
            res.json(updatedEmp);
          }
        })
      }
    })
  } catch(e) {
    console.log(e);
    res.status(500).send({
      'err': 'Internal server error: ' + e.message
    })
  }
})
module.exports = router;
