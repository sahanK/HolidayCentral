const express = require('express');
const router = express.Router();

const {
    searchFlights,
    selectFlight,
    saveReservation,
    getCartItems,
    proceedReservation,
    deleteReservation
} = require('../controllers/agent/flights');

const { protect, authorize } = require('../middleware/auth');

router
  .get('/flights', protect, authorize('agent'), searchFlights)
  .get('/verify', protect, authorize('agent'), selectFlight)
  .post('/save', protect, authorize('agent'), saveReservation)
  .get('/cart', protect, authorize('agent'), getCartItems)
  .put('/proceed', protect, authorize('agent'), proceedReservation)
  .delete('/remove', protect, authorize('agent'), deleteReservation);

module.exports = router;