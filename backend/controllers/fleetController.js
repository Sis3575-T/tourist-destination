const Fleet = require('../models/Fleet');

// @desc  Get all fleet services
// @route GET /api/fleet
exports.getFleet = async (req, res) => {
  try {
    const fleet = await Fleet.find().sort({ createdAt: 1 });
    res.json(fleet);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc  Get fleet item by ID
// @route GET /api/fleet/:id
exports.getFleetById = async (req, res) => {
  try {
    const item = await Fleet.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Fleet item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
