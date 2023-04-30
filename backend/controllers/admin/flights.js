const csv = require("csv-parse");
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../util/error');
const { flightsCsvColumns } = require('../../util/constants');
const { validateCsvData } = require('../../util/validations');
const Flight = require('../../models/Flight');

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
    
    const { rows, error } = validateCsvData(data, flightsCsvColumns);

    if (error) {
      return next(error);
    }

    if (rows && rows.length > 0) {
      const flights = rows.map((row) => {
        let flightJson = {};
        row.forEach((entry, index) => {
          flightJson[flightsCsvColumns[index]] = entry;
        });
        return flightJson;
      });
  
      const flightDocs = await Flight.insertMany(flights);

      return res.status(200).json({
        message: 'Data uploaded successfully',
        data: flightDocs
      });
    }
    return next(new ErrorResponse('There was no data for the columns', 400));
  });
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

exports.deleteAllFlights = asyncHandler(async (req, res, next) => {
  await Flight.deleteMany();
  res.status(200).json({
    message: 'Deleted all data',
  });
});