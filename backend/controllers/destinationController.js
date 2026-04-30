const Destination = require('../models/Destination');

// @desc    Get all destinations
// @route   GET /api/destinations
exports.getDestinations = async (req, res) => {
  try {
    const { country, category, search, maxPrice } = req.query;
    let query = {};

    if (country) query.country = country;
    if (category) query.category = category;
    if (maxPrice) query.price = { $lte: Number(maxPrice) };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const destinations = await Destination.find(query);
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Get all unique countries
// @route   GET /api/destinations/countries
exports.getCountries = async (req, res) => {
  try {
    const countries = await Destination.distinct('country');
    res.json(countries.sort());
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Get destination by ID
// @route   GET /api/destinations/:id
exports.getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }
    res.json(destination);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
