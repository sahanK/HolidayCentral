const csv = require("csv-parse");
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../util/error');
const { validateCsvData } = require('../../util/validations');
const { packagesCsvColumns } = require("../../util/constants");
const Package = require('../../models/Package');

exports.addPackages = asyncHandler(async (req, res, next) => {
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

    const { rows, error } = validateCsvData(data, packagesCsvColumns); 
    
    if (error) {
      return next(error);
    }

    if (rows && rows.length > 0) {
      const packages = rows.map((row) => {
        let packageJson = {};
        row.forEach((entry, index) => {
          packageJson[packagesCsvColumns[index]] = entry;
        });
        return packageJson;
      });

      const packagesDocs = await Package.insertMany(packages);
  
      return res.status(200).json({
        success: true,
        message: 'Data uploaded successfully',
        data: packagesDocs
      });
    }
    return next(new ErrorResponse('There was no data for the columns', 400));
  });
});

exports.getAllPackages = asyncHandler(async (req, res, next) => {
  const packages = await Package.find({});

  res.status(200).json({
    success: true,
    data: packages
  });
});

exports.getPackage = asyncHandler(async (req, res, next) => {
  const package = await Package.findById(req.params.id);

  if (!package) {
    return next(new ErrorResponse(`Could not find package by id: ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: package
  });
});

exports.updatePackage = asyncHandler(async (req, res, next) => {
  const package = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!package) {
    return next(new ErrorResponse(`Could not find package by id: ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    message: `Updated package with id: ${req.params.id}`,
    data: package
  });
});

exports.deletePackage = asyncHandler(async (req, res, next) => {
  const package = await Package.findByIdAndDelete(req.params.id);

  if (!package) {
    return next(new ErrorResponse(`Could not find package by id: ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    message: `Deleted package with id: ${req.params.id}`
  });
});

exports.deleteAllPackages = asyncHandler(async (req, res, next) => {
  await Package.deleteMany();
  res.status(200).json({
    success: true,
    message: 'Deleted all packages',
  });
});