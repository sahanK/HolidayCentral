const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  hotel_name: String,
  destination_country: String,
  destination_city: String,
  star_rating: String,
  price_per_night: String,
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