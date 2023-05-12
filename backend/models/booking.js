const mongoose = require("mongoose");

const Bookingscheema = mongoose.Schema({
    _id:{
        type: String,
        required: true
    },
    hotel_name :{
        type: String,
        required: true
    },
    destination_country:{
        type: String,
        required: true
    },
    
    star_rating :{
        type: String,
        required: true
    },
    facilities: {
        type: Array,
        required: true
    },
    board_basis:{
        type: Array,
        required: true
    },
   
    price_per_night : {
        type:Number,
        required:true
    },
    fromDate:{
        type: String,
        required: true
    },
  TomDate:{
        type: String,
        required: true
    },
    totalDate:{
        type: String,
        required: true
    },
  TotalAmount:{
        type: Number,
        required: true
    },
   status:{
        type: String,
        required: true
    },
  TranscetionID:{
        type: String,
        required: true
    },

    
},{timestamp:true})

const bookingmoduel = mongoose.model("bookings",Bookingscheema);

module.exports = bookingmoduel