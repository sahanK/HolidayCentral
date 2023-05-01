const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  hotel_name: {
    type: String,
    required: true,
  },
  destination_country: {
    type: String,
    required: true,
  },
  destination_city: {
    type: String,
    required: true,
  },
  star_rating: Number,
  price_per_night: {
    type: Number,
    required: true,
  },
  facilities: [String],
  available_room_types: [String],
  board_basis: [String],
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('Hotel', HotelSchema, 'Hotels');