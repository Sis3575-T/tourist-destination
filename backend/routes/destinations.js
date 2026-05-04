const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestinationsByCategory,
  getCountries,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
} = require('../controllers/destinationController');

// GET all destinations
router.get('/', getDestinations);

// GET destinations grouped by category
router.get('/categories', getDestinationsByCategory);

// GET unique countries
router.get('/countries', getCountries);

// GET single destination
router.get('/:id', getDestinationById);

// POST create new destination (Admin)
router.post('/', createDestination);

// PUT update destination (Admin)
router.put('/:id', updateDestination);

// DELETE destination (Admin)
router.delete('/:id', deleteDestination);

module.exports = router;
