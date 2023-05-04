const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
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
    available_room_types :{
        type: Array,
        required: true
    },
    board_basis:{
        type: Array,
        required: true
    },
   
    imageurls : [],
    price_per_night : {
        type:Number,
        required:true
    },
} , {
    timestamps : true,
})

const roomModel = mongoose.model("room" , roomSchema)

module.exports = roomModel