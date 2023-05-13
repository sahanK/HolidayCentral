const mongoose = require('mongoose');

const FlightReservationSchema = new mongoose.Schema({
  flightId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  atCart: {
    type: Boolean,
    required: true,
    default: true
  },
  proceed: {
    type: Boolean,
    required: true,
    default: false
  },
  seatCount: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('FlightReservation', FlightReservationSchema, 'FlightReservations');