const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  error.message = err.message;

  console.log(error);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal server error',
  });
};

module.exports = errorHandler;