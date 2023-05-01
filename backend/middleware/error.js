const ErrorResponse = require("../util/error");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  let error = { ...err }
  error.message = err.message;

  // console.log(error);

  if (err.name === 'CastError') {
    error = new ErrorResponse(`Resource not found with id: ${err.value}`, 404)
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.path).reduce(
      (accumulator, currentValue) => accumulator + currentValue + ', ' , 'Please provide ');
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal server error',
  });
};

module.exports = errorHandler;