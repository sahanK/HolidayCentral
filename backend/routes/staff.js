const express = require('express');
const router = express.Router();

const {
  addFlights,
  getFlights,
  deleteFlights,
  getFlight,
  updateFlight,
  deleteFlight
} = require('../controllers/staff/flights');

const {
  addHotels,
  getHotels,
  deleteHotels,
  getHotel,
  updateHotel,
  deleteHotel
} = require('../controllers/staff/hotels');

const {
  addPackages,
  deleteAllPackages,
  getAllPackages,
  getPackage,
  updatePackage,
  deletePackage
} = require('../controllers/staff/packages');

const { protect, authorize } = require('../middleware/auth');

router
  .get('/flights', protect, authorize('staff'), getFlights)
  .post('/flights', protect, authorize('staff'), addFlights)
  .delete('/flights', protect, authorize('staff'), deleteFlights);

router
  .get('/flights/:id', protect, authorize('staff'), getFlight)
  .put('/flights/:id', protect, authorize('staff'), updateFlight)
  .delete('/flights/:id', protect, authorize('staff'), deleteFlight);

router
  .get('/hotels', protect, authorize('staff'), getHotels)
  .post('/hotels', protect, authorize('staff'), addHotels)
  .delete('/hotels', protect, authorize('staff'), deleteHotels);

router
  .get('/hotels/:id', protect, authorize('staff'), getHotel)
  .put('/hotels/:id', protect, authorize('staff'), updateHotel)
  .delete('/hotels/:id', protect, authorize('staff'), deleteHotel);

router
  .get('/packages', protect, authorize('staff'), getAllPackages)
  .post('/packages', protect, authorize('staff'), addPackages)
  .delete('/packages', protect, authorize('staff'), deleteAllPackages);

router
  .get('/packages/:id', protect, authorize('staff'), getPackage)
  .put('/packages/:id', protect, authorize('staff'), updatePackage)
  .delete('/packages/:id', protect, authorize('staff'), deletePackage);

module.exports = router;