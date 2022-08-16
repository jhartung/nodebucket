const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');



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

router.get('/employees/:employeeId', async(req, res) => {
  try {
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

module.exports = router;
