const { StatusCodes } = require('http-status-codes');

//**************** express inbuild error handler *******************/
const errorHandler = (err, req, res, next) => { 

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something went wrong, try again"
    }

    //?mongoose cast error/syntax error
    if(err.name === 'CastError'){
        customError.message = `No item found with id : ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }

    return res.status(customError.statusCode).json({
        message: customError.message
    });
}

module.exports = errorHandler;