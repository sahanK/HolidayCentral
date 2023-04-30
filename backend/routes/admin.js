const express = require('express');
const router = express.Router();

const {
  addFlights,
  getFlights,
  deleteAllFlights
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
  .delete('/flights', deleteAllFlights);

router
  .get('/hotels', getHotels)
  .post('/hotels', addHotels)
  .delete('/hotels', deleteHotels);

router
  .get('/hotels/:id', getHotel)
  .post('/hotels/:id', updateHotel)
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