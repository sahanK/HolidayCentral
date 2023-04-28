const express = require('express');
const router = express.Router();

const { addFlights, getFlights, deleteAllFlights } = require('../controllers/admin');

router
  .get('/flights', getFlights)
  .post('/flights', addFlights)
  .delete('/flights', deleteAllFlights);

module.exports = router;