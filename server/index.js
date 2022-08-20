/*
============================================
; Title: Nodebucket (Week 2 - Sprint 1)
; Author: Professor Krasso
; Date: 20 August 2022
; Modified By: Joel Hartung
; Code Attribution: Swagger UI
; URL: https://swagger.io/tools/swagger-ui/
;===========================================
*/

// require statements
const express = require('express');
const path = require('path');
const http = require('http');

// swagger require statements
const swaggerUiExpress = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// mongoose require statements
const mongoose = require('mongoose');


const EmployeeApi = require('./routes/employee-api');
const app = express(); // Express variable.



/**
 * App configurations.
 */
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(express.static(path.join(__dirname, '../dist/nodebucket')));
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')));

// default server port value.
const PORT = 3000 || process.env.PORT;

// openAPI options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "nodebucket",
      version: "1.0.0"
    },
  },
  apis: [`${__dirname}/routes/*.js`],
};

const openapiSpecifications = swaggerJsdoc(options);

// tells the app to use swagger /api-docs
app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(openapiSpecifications));
app.use('/api', EmployeeApi);

// Database connection string
const CONN = 'mongodb+srv://nodebucket_user:s3cret@cluster0.580azmi.mongodb.net/nodebucket?retryWrites=true&w=majority';

/**
 * Database connection.
 */
mongoose.connect(CONN).then(() => {
  console.log('Connection to the database was successful');
}).catch(err => {
  console.log('MongoDB Error: ' + err.message);
});



// Wire-up the Express server.
app.listen(PORT, () => {
  console.log('Application started and listening on PORT: ' + PORT);
})
