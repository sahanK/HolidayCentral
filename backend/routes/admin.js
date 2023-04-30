const express = require('express');
const router = express.Router();

const {
  addFlights,
  getFlights,
  deleteFlights,
  getFlight,
  updateFlight,
  deleteFlight
} = require('../controllers/admin/flights');

const {
  addHotels,
  getHotels,
  deleteHotels,
  getHotel,
  updateHotel,
  deleteHotel
} = require('../controllers/admin/hotels');

const {
  addPackages,
  deleteAllPackages,
  getAllPackages,
  getPackage,
  updatePackage,
  deletePackage
} = require('../controllers/admin/packages');

router
  .get('/flights', getFlights)
  .post('/flights', addFlights)
  .delete('/flights', deleteFlights);

router
  .get('/flights/:id', getFlight)
  .put('/flights/:id', updateFlight)
  .delete('/flights/:id', deleteFlight);

router
  .get('/hotels', getHotels)
  .post('/hotels', addHotels)
  .delete('/hotels', deleteHotels);

router
  .get('/hotels/:id', getHotel)
  .put('/hotels/:id', updateHotel)
  .delete('/hotels/:id', deleteHotel);

router
  .get('/packages', getAllPackages)
  .post('/packages', addPackages)
  .delete('/packages', deleteAllPackages);

router
  .get('/packages/:id', getPackage)
  .put('/packages/:id', updatePackage)
  .delete('/packages/:id', deletePackage);

module.exports = router;