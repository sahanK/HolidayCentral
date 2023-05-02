const express = require("express");

const app = express();

const dbcofig = require("./db")

const roomsRoute = require("./routers/roomsroute")

app.use("/api/rooms" , roomsRoute)

// app.listen(8080)
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("node server using  nodemon started ") )