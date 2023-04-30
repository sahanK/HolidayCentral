const ErrorResponse = require("../util/error");

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message;

  console.log(error);

  if (err.name === 'CastError') {
    error = new ErrorResponse(`Resource not found with id: ${err.value}`, 404)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal server error',
  });
};

module.exports = errorHandler;