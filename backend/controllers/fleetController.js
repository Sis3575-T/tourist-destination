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

// @desc  Create new fleet service (Admin)
// @route POST /api/fleet
exports.createFleetItem = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      pricePerDay,
      rating,
      reviews,
      icon,
      capacity,
      features,
      category
    } = req.body;

    const fleetItem = new Fleet({
      name,
      description,
      image,
      pricePerDay,
      rating: rating || 4.5,
      reviews: reviews || 'Verified',
      icon: icon || '🚗',
      capacity: capacity || 4,
      features: features || [],
      category: category || 'Standard'
    });

    const savedItem = await fleetItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};

// @desc  Update fleet service (Admin)
// @route PUT /api/fleet/:id
exports.updateFleetItem = async (req, res) => {
  try {
    const updatedItem = await Fleet.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Fleet item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};

// @desc  Delete fleet service (Admin)
// @route DELETE /api/fleet/:id
exports.deleteFleetItem = async (req, res) => {
  try {
    const deletedItem = await Fleet.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: 'Fleet item not found' });
    }

    res.json({ message: 'Fleet item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
