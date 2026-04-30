const express = require('express');
const router = express.Router();
const { 
  getDestinations, 
  getCountries, 
  getDestinationById 
} = require('../controllers/destinationController');

// GET all destinations
router.get('/', getDestinations);

// GET unique countries
router.get('/countries', getCountries);

// GET single destination
router.get('/:id', getDestinationById);

module.exports = router;