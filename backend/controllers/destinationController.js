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

// @desc    Create new destination (Admin)
// @route   POST /api/destinations
exports.createDestination = async (req, res) => {
  try {
    const {
      name,
      location,
      country,
      description,
      price,
      bestSeason,
      category,
      image,
      activities,
      duration,
      distanceFromAddis
    } = req.body;

    const destination = new Destination({
      name,
      location,
      country,
      description,
      price,
      bestSeason,
      category,
      image,
      activities: activities || [],
      duration,
      distanceFromAddis
    });

    const savedDestination = await destination.save();
    res.status(201).json(savedDestination);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};

// @desc    Update destination (Admin)
// @route   PUT /api/destinations/:id
exports.updateDestination = async (req, res) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedDestination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.json(updatedDestination);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data', error: err.message });
  }
};

// @desc    Delete destination (Admin)
// @route   DELETE /api/destinations/:id
exports.deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);

    if (!destination) {
      return res.status(404).json({ message: 'Destination not found' });
    }

    res.json({ message: 'Destination deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
