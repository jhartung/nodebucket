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
const BaseResponse = require('../models/base-response');

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

// YAML code to describe updateTasks API
/**
 * updateTasks
 * @openapi
 * /api/employees/{employeeId}/tasks:
 *   put:
 *     tags:
 *       - Employees
 *     name: updateTasks
 *     description: API to update a task
 *     summary: updates a task
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - todo
 *               - done
 *             properties:
 *               todo:
 *                 type: array
 *               done:
 *                 type: array
 *     responses:
 *       '200':
 *         description: Query successful
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.put('/employees/:employeeId/tasks', async(req, res) => {
  try { // API updates the task "todo" and "done" arrays, or returns an error message
    Employee.findOne({'employeeId': req.params.employeeId}, function(err, emp) {
      if (err) {
        const updateTasksMongoDbError = new BaseError('501', 'MongoDB server error', err);
        console.log(updateTasksMongoDbError.toObject());
        res.status(501).send(updateTasksMongoDbError.toObject());
      } else {
        console.log(emp);
        emp.set({
          todo: req.body.todo,
          done: req.body.done
        })
        // saves the updated employee object
        emp.save(function(err, updatedEmp) {
          if (err) {
            const updatedEmpMongoError = new BaseResponse('501', 'MongoDb server error', err); // utilizes BaseResponse for HTTPcode and messages
            console.log(updatedEmpMongoError.toObject());
            res.status(501).send(updatedEmpMongoError.toObject());
          } else {
            const updatedEmpResponse = new BaseResponse('200', 'Query successful', updatedEmp);
            console.log(updatedEmpResponse.toObject());
            res.status(200).send(updatedEmpResponse.toObject());
          }
        })
      }
    })
  } catch (e) {
    console.log(e);
    const updateTasksCatchError = new BaseResponse('500', 'Internal server error', e);
    res.status(500).send(updateTasksCatchError.toObject());
  }
})

// YAML description for deleteTask API
/**
 * deleteTask
 * @openapi
 * /api/employees/{employeeId}/tasks/{taskId}:
 *   delete:
 *     tags:
 *       - Employees
 *     name: deleteTask
 *     description: API to delete a task by id
 *     summary: deletes a task by id
 *     parameters:
 *       - name: employeeId
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *       - name: taskId
 *         in: path
 *         required: true
 *         scheme:
 *           type: string
 *     responses:
 *       '200':
 *         description: Query successful
 *       '300':
 *         description: Invalid taskId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

// API to delete the task or return an error message
router.delete('/employees/:employeeId/tasks/:taskId', async(req, res) => {
  try {
    Employee.findOne({'employeeId': req.params.employeeId}, function(err, emp) {
      if (err) {
        const deleteTaskMongoErrorResponse = new BaseResponse('501', 'MongoDb server error', err);
        console.log(deleteTaskMongoErrorResponse.toObject());
        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      } else {
        console.log(emp);

        const taskId = req.params.taskId; // taskId is required
        // item _id is used as taskId
        const todoItem = emp.todo.find(item => item._id.toString() === taskId);
        const doneItem = emp.done.find(item => item._id.toString() === taskId);
        // searches "ToDo" for the taskId and deletes it
        if (todoItem) {
          emp.todo.id(todoItem._id).remove();

          emp.save(function(err, updatedTodoItemEmp) {
            if (err) {
              const updatedTodoItemErrResponse = new BaseResponse('501', 'MongoDB Server error', err);
              console.log(updatedTodoItemErrResponse.toObject());
              res.status(501).send(updatedTodoItemErrResponse.toObject());
            } else {
              const updatedTodoItemSuccess = new BaseResponse('200', 'Query successful', updatedTodoItemEmp);
              console.log(updatedTodoItemSuccess.toObject());
              res.status(200).send(updatedTodoItemSuccess.toObject());
            }
          })
          // searches "Done" for the taskId and deletes it
        } else if (doneItem) {
          emp.done.id(doneItem._id).remove();
// utilizes BaseResponse for error messaging and HTTPcode response
          emp.save(function(err, updatedDoneItemEmp) {
            if (err) {
              const updatedDoneItemErrResponse = new BaseResponse('501', 'MongoDB server error', err);
              console.log(updatedDoneItemErrResponse.toObject());
              res.status(501).send(updatedDoneItemErrResponse.toObject());
            } else {
              const updatedDoneItemSuccessResponse = new BaseResponse('200', 'Query successful', updatedDoneItemEmp);
              console.log(updatedDoneItemSuccessResponse.toObject());
              res.status(200).send(updatedDoneItemSuccessResponse.toObject());
            }
          })
          // utilizes BaseResponse for error messaging and HTTPcode response
        } else {
          const invalidTaskIdResponse = new BaseResponse('300', 'Invalid taskId. ' + taskId);
          console.log(invalidTaskIdResponse.toObject());
          res.status(300).send(invalidTaskIdResponse.toObject());
        }
      }
    })

  } catch (e) {
    const deleteTaskErrorResponse = new BaseResponse('500', 'Internal server error', e);
    console.log(deleteTaskErrorResponse.toObject())
    res.status(500).send(deleteTaskErrorResponse.toObject())
  }
})

// exports the module
module.exports = router;
