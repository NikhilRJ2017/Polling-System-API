const { StatusCodes } = require('http-status-codes');
const CustomErrorClass = require('./custom_errors');

class BadRequestError extends CustomErrorClass{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequestError;