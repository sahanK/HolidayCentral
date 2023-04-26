const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../util/error');

exports.addFlights = asyncHandler(async (req, res, next) => {
  return next(new ErrorResponse('addFlights not implemented', 404));
});

exports.addHotels = asyncHandler(async (req, res, next) => {
  return next(new ErrorResponse('addHotels not implemented', 404));
});

exports.addPackages = asyncHandler(async (req, res, next) => {
  return next(new ErrorResponse('addPackages not implemented', 404));
});