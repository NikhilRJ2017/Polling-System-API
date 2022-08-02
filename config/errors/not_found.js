const { StatusCodes } = require('http-status-codes');
const CustomErrorClass = require('./custom_errors');

class NotFoundError extends CustomErrorClass{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;