const express = require('express');
const router = express.Router();

const {
  addFlights,
  getFlights,
  deleteAllFlights
} = require('../controllers/admin/flight');
const { addHotels } = require('../controllers/admin/hotels');

router
  .get('/flights', getFlights)
  .post('/flights', addFlights)
  .delete('/flights', deleteAllFlights);

router
  .post('/hotels', addHotels);

module.exports = router;