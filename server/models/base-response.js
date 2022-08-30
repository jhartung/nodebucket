/*
============================================
; Title: Nodebucket (Week 4 - Sprint 3)
; Author: Professor Krasso
; Date: 30 August 2022
; Modified By: Joel Hartung
; Code Attribution: Schemas
; URL: https://mongoosejs.com/docs/guide.html
;===========================================
*/

// defines BaseResponse class
class BaseResponse {
    constructor(httpCode, message, data) {
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
    }


// toObject function returns base response data
toObject() {
  return {
    'httpCode': this.httpCode,
    'message': this.message,
    'data': this.data,
    'timestamp': new Date().toLocaleDateString()
    }
  }
}

// exports BaseResponse
module.exports = BaseResponse;
