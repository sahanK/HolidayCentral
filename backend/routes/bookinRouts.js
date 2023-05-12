const Room = require("../models/room")
const express = require("express");

const router = express.Router();

const booking = require("../models/booking");
const { format } = require("path");

router.post("/bookroom", async (req, res) => {
    const {
        _id,
        price_per_night,
        fromDate,
        TomDate,
        totalDate,
        TotalAmount
    }= req.body
try {
    const newBooking = new booking({
        _id ,
        hotel_name,
        destination_country,
        star_rating,
        facilities,
        board_basis,
        price_per_night,
      TomDate,
        totalDate,
      TotalAmount,
       status,
      TranscetionID
    })
    const booking =await newBooking.save();
    const roomtemp = await Room.findOne({_id : room._id})
    roomtemp.currentbookings.push({bookingid : booking._id, fromDate:moment(fromDate).format("DD-MM-YYYY"),TomDate:moment(fromDate).format("DD-MM-YYYY")})
    await roomtemp.save(); 
    res.send("room booking succusyfully")
    
} catch (error) {
  res.status(500).json({
    message: 'Internal server error'
  });
}

});

module.exports = router