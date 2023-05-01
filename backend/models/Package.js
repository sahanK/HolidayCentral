const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  package_name: {
    type: String,
    required: true,
  },
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
  duration: {
    type: Number,
    required: true,
  },
  num_travelers: {
    type: Number,
    required: true,
  },
  specialty: String,
  price_usd: {
    type: Number,
    required: true,
  },
  rating: Number,
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model('Package', PackageSchema ,'Packages');