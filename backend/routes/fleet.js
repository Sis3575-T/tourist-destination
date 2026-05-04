const express = require('express');
const router = express.Router();
const {
  getFleet,
  getFleetById,
  createFleetItem,
  updateFleetItem,
  deleteFleetItem
} = require('../controllers/fleetController');

router.get('/', getFleet);
router.get('/:id', getFleetById);

// POST create new fleet service (Admin)
router.post('/', createFleetItem);

// PUT update fleet service (Admin)
router.put('/:id', updateFleetItem);

// DELETE fleet service (Admin)
router.delete('/:id', deleteFleetItem);

module.exports = router;
