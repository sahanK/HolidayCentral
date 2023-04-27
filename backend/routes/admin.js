const express = require('express');
const router = express.Router();

const { addFlights, getFlights } = require('../controllers/admin');

router
  .get('/flights', getFlights)
  .post('/flights', addFlights);

module.exports = router;