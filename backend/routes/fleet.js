const express = require('express');
const router = express.Router();
const { getFleet, getFleetById } = require('../controllers/fleetController');

router.get('/', getFleet);
router.get('/:id', getFleetById);

module.exports = router;
