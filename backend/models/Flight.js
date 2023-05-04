const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  arrival_airport: {
    type: String,
    required: true,
  },
  arrival_city: {
    type: String,
    required: true,
  },
  arrival_country: {
    type: String,
    required: true,
  },
  arrival_iata: {
    type: String,
    required: true,
  },
  departure_airport: {
    type: String,
    required: true,
  },
  departure_city: {
    type: String,
    required: true,
  },
  departure_country: {
    type: String,
    required: true,
  },
  departure_iata: {
    type: String,
    required: true,
  },
  arrival_date: {
    type: Date,
    required: true,
  },
  departure_date: {
    type: Date,
    required: true,
  },
  cabin_class: {
    type: String,
    required: true,
  },
  airline_name: {
    type: String,
    required: true,
  },
  airline_country: {
    type: String,
    required: true,
  },
  airline_iata: {
    type: String,
    required: true,
  },
  ticket_price_usd: {
    type: Number,
    required: true,
  },
  duration: Number,
  seatCount: {
    type: Number,
    required: true,
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

module.exports = mongoose.model('Flight', FlightSchema, 'Flights');