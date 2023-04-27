const csv = require("csv-parse");
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../util/error');
const { flightsCsvColumns } = require('../util/constants');
const Flight = require('../models/flight');

exports.addFlights = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse('Please upload a csv file', 400));
  }

  const file = req.files.file;

  if (file.mimetype !== 'text/csv') {
    return next(new ErrorResponse('Please only upload csv files', 400));
  }

  csv.parse(file.data, async (err, data) => {
    if (err) {
      return next(new ErrorResponse('Failed to read the file', 500));
    }
    const columnNames = data[0];

    if (columnNames.length !== flightsCsvColumns.length) {
      return next(new ErrorResponse('There are missing columns in your file', 400));
    }

    let incorrectColumns = false;
    columnNames.forEach((columnName, columnIndex) => {
      if (flightsCsvColumns[columnIndex] !== columnName) {
        incorrectColumns = true;
      }
    });

    if (incorrectColumns) {
      return next(new ErrorResponse('The data are not in expected order', 400));
    }

    // Remove first row (column names)
    data.shift();

    const flights = data.map((flight) => {
      let flightJson = {};
      flight.forEach((entry, index) => {
        flightJson[flightsCsvColumns[index]] = entry;
      });
      return flightJson
    });

    const flightDocs = await Flight.insertMany(flights);
    res.status(200).json({
      message: 'Data uploaded successfully',
      data: flightDocs
    });
  });
});

exports.addHotels = asyncHandler(async (req, res, next) => {
  return next(new ErrorResponse('addHotels not implemented', 404));
});

exports.addPackages = asyncHandler(async (req, res, next) => {
  return next(new ErrorResponse('addPackages not implemented', 404));
});

exports.getFlights = asyncHandler(async (req, res, next) => {
  const flights = await Flight.find({});

  res.status(200).json({
    message: 'success',
    data: flights
  });
});