const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../util/error');
const Flight = require('../../models/Flight');
const User = require('../../models/User');
const FlightReservation = require('../../models/FlightReservation');

exports.searchFlights = asyncHandler(async (req, res, next) => {

  let flightsParam = "";

  if (!req.body.airline_name || !req.body.airline_country) {
    // create object with mandatory fields
    flightsParam = {
      departure_city: req.body.departure_city,
      departure_country: req.body.departure_country,
      departure_date: req.body.departure_date,
      arrival_city: req.body.arrival_city,
      arrival_country: req.body.arrival_country,
      arrival_date: req.body.arrival_date,
      cabin_class: req.body.cabin_class,
    };

  } else {
    // create object with optional fields
    flightsParam = {
      departure_city: req.body.departure_city,
      departure_country: req.body.departure_country,
      departure_date: req.body.departure_date,
      arrival_city: req.body.arrival_city,
      arrival_country: req.body.arrival_country,
      arrival_date: req.body.arrival_date,
      cabin_class: req.body.cabin_class,
      airline_name: req.body.airline_name,
      airline_country: req.body.airline_country,
    };
  }

  // search flights
  const flights = await Flight.find(flightsParam);

  if (!flights) {
    return next(new ErrorResponse(`No flights available!`, 404));
  }

  res.status(200).json({
    success: true,
    data: flights
  });
});

exports.selectFlight = asyncHandler(async (req, res, next) => {

  const flightId = req.body.flightId;
  const reqSeatCount = req.body.reqSeatCount;

  const flight = await Flight.findById(flightId);

  if (!flight) {
    return next(new ErrorResponse(`Could not find flight by id: ${flightId}`, 404));
  }

  // check seat count availability
  if (flight.seatCount < reqSeatCount) {
    return next(new ErrorResponse(`Requested seat count unavailable!`, 404));
  }

  res.status(200).json({
    success: true,
    data: flight
  });
});

exports.saveReservation = asyncHandler(async (req, res, next) => {

  const flightId = req.body.flightId;
  const reqSeatCount = req.body.reqSeatCount;
  const userId = req.body.userId;

  const flight = await Flight.findById(flightId);
  const user = await User.findById(userId);

  if (!flight) {
    return next(new ErrorResponse(`Could not find flight by id: ${flightId}`, 404));
  }
  if (!user) {
    return next(new ErrorResponse(`Could not find user by id: ${userId}`, 404));
  }

  // create reservation
  const reservation = [{
    flightId: flightId,
    userId: userId,
    seatCount: reqSeatCount
  }];
  await Flight.insertMany(reservation)
    .then((docs) => {
      console.log('Successfully inserted reservations', docs);
    })
    .catch((err) => {
      console.error('Error inserting reservations', err);
    });

  // update flight seat count (reducing)
  Flight.findByIdAndUpdate(flightId, { seatCount: (flight.seatCount - reqSeatCount) }, { new: true }, (err, user) => {
    if (err) throw err;
    console.log(user);
  });

  res.status(200).json({
    success: true,
    data: flight
  });
});

exports.getCartItems = asyncHandler(async (req, res, next) => {

  const userId = req.body.userId;

  // search cart items
  const pendingItems = await FlightReservation.find({
    userId: userId,
    atCart: true,
    proceed: false
  });

  if (!pendingItems) {
    return next(new ErrorResponse(`No pending items available!`, 404));
  }

  res.status(200).json({
    success: true,
    data: pendingItems
  });
});

exports.proceedReservation = asyncHandler(async (req, res, next) => {

  const reservationId = req.body.reservationId;

  // update proceed status of the reservation
  FlightReservation.findByIdAndUpdate(reservationId, { proceed: true }, { new: true }, (err, user) => {
    if (err) throw err;
    console.log(user);
  });

  res.status(200).json({
    success: true,
    message: `Updated reservation with id: ${reservationId}`
  });
});

exports.deleteReservation = asyncHandler(async (req, res, next) => {
  const reservation = await Flight.findById(req.params.id);

  if (!reservation) {
    return next(new ErrorResponse(`Could not find reservation by id: ${req.params.id}`, 404));
  }

  reservation.deleteOne();

  res.status(200).json({
    success: true,
    message: `Deleted reservation with id: ${req.params.id}`,
  });
});