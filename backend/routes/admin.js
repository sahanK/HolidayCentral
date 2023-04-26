const express = require('express');
const router = express.Router();

const { addFlights } = require('../controllers/admin');

router
  .post('/flights', addFlights);

module.exports = router;