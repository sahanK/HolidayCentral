const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  arrival_airport: String,
  arrival_city: String,
  arrival_country: String,
  arrival_iata: String,
  departure_airport: String,
  departure_city: String,
  departure_country: String,
  departure_iata: String,
  arrival_date: String,
  departure_date: String,
  cabin_class: String,
  airline_name: String,
  airline_country: String,
  airline_iata: String,
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