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
  .post('/flights', protect, authorize('agent'), searchFlights)
  .get('/verify-flight', protect, authorize('agent'), selectFlight)
  .post('/reserve-flight', protect, authorize('agent'), saveReservation)
  .get('/cart', protect, authorize('agent'), getCartItems)
  .put('/proceed', protect, authorize('agent'), proceedReservation)
  .delete('/remove', protect, authorize('agent'), deleteReservation);

module.exports = router;