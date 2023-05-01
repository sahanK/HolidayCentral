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

const {
  addUser,
  getUsers,
  deleteUser,
  getUser,
  updateUser
} = require('../controllers/admin/users');

const { protect, authorize } = require('../middleware/auth');

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

router
  .get('/users', protect, authorize('admin', 'staff'), getUsers)
  .post('/users', addUser);

router
  .get('/users/:id', getUser)
  .put('/users/:id', updateUser)
  .delete('/users/:id', deleteUser);

module.exports = router;