/*
============================================
; Title: Nodebucket (Week 3 - Sprint 2)
; Author: Professor Krasso
; Date: 26 August 2022
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

// YAML code to describe the findAllTasks API
/**
 * findAllTasks
 * @openapi
 * /api/employees/{employeeId}/tasks:
 *   get:
 *     tags:
 *       - Employees
 *     description:  API for returning all tasks by employeeId
 *     summary: returns all tasks by employeeId
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *         description: Employee document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee tasks
 *       '401':
 *         description: Invalid employeeId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */

// findAllTasks API
router.get('/employees/:employeeId/tasks', async(req, res) => {
  try { // returns all employee tasks or appropriate error message
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

// YAML code to describe the createTask API
/**
 * createTask
 * @openapi
 * /api/employees/{employeeId}/tasks:
 *   post:
 *     tags:
 *       - Employees
 *     name: createTask
 *     description:  API for creating a task by employeeId
 *     summary: creates a new task by employeeId
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *         description: Employee document id
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Task creation successful
 *       '401':
 *         description: Invalid employeeId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB exception
 */

// createTask API specifications
router.post('/employees/:employeeId/tasks', async(req, res) => {
  try { // creates an employee task or returns an appropriate error message
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

// exports the module
module.exports = router;
