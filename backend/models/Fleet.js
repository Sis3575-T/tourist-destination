const mongoose = require('mongoose');

const fleetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  rating: { type: Number, default: 4.5 },
  reviews: { type: String, default: 'Verified' },
  icon: { type: String, default: '🚗' },
}, { timestamps: true });

module.exports = mongoose.model('Fleet', fleetSchema);
