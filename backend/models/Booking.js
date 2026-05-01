const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  travelers: {
    type: Number,
    default: 1,
  },
  // Traveler info
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  nationality: { type: String, default: '' },
  specialRequests: { type: String, default: '' },

  // Payment
  paymentMethod: { type: String, default: '' },
  paymentProof: { type: String, default: '' },
  totalAmount: { type: Number, default: 0 },

  // Destination snapshot (so data is preserved even if destination changes)
  destinationPreview: {
    name: String,
    location: String,
    image: String,
    price: Number,
    country: String,
    category: String,
    duration: String,
  },

  // Transport/service selected
  servicePreview: {
    name: String,
    icon: String,
    pricePerDay: Number,
    terrainLabel: String,
    image: String,
  },

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
