const csv = require("csv-parse");
const asyncHandler = require('../../middleware/async');
const {
  hotelsCsvColumns,
  hotelsCsvColumnsFacilitiesIndex,
  hotelsCsvColumnsRoomTypesIndex,
  hotelsCsvColumnsBoardBasisIndex
} = require('../../util/constants');
const { validateCsvData } = require('../../util/validations');
const Hotel = require('../../models/Hotel');
const ErrorResponse = require('../../util/error');

exports.addHotels = asyncHandler(async (req, res, next) => {
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

    const { rows, error } = validateCsvData(data, hotelsCsvColumns); 
    
    if (error) {
      return next(error);
    }

    if (rows && rows.length > 0) {
      const hotels = rows.map((row) => {
        let hotelJson = {};
        row.forEach((column, index) => {
          if (
            index === hotelsCsvColumnsFacilitiesIndex ||
            index === hotelsCsvColumnsRoomTypesIndex ||
            index === hotelsCsvColumnsBoardBasisIndex
          ) {
            const featuresArray = column.split(':');
            hotelJson[hotelsCsvColumns[index]] = featuresArray;
          } else {
            hotelJson[hotelsCsvColumns[index]] = column;
          }
        });
        return hotelJson;
      });
  
      const hotelDocs = await Hotel.insertMany(hotels);

      return res.status(200).json({
        success: true,
        message: 'Data uploaded successfully',
        data: hotelDocs
      });
    }
    return next(new ErrorResponse('There was no data for the columns', 400));
  });
});

exports.getHotels = asyncHandler(async (req, res, next) => {
  const hotels = await Hotel.find();

  res.status(200).json({
    success: true,
    data: hotels
  });
});

exports.deleteHotels = asyncHandler(async (re, res, next) => {
  await Hotel.deleteMany();

  res.status(200).json({
    success: true,
    message: 'Deleted all hotels',
  });
});

exports.getHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    return next(new ErrorResponse(`Could not find hotel by id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: hotel
  });
});

exports.updateHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!hotel) {
    return next(new ErrorResponse(`Could not find hotel by id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    message: `Updated hotel with id ${req.params.id}`,
    data: hotel
  });
});

exports.deleteHotel = asyncHandler(async (req, res, next) => {
  const hotel = await Hotel.findById(req.params.id);

  if (!hotel) {
    return next(new ErrorResponse(`Could not find hotel by id: ${req.params.id}`, 404));
  }

  hotel.deleteOne();

  res.status(200).json({
    success: true,
    message: `Deleted hotel with id: ${req.params.id}`
  });
});