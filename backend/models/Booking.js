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
  name: String,
  email: String,
  phone: String,
  paymentProof: String, // Filename or URL
  destinationPreview: {
    name: String,
    location: String,
    image: String,
    price: Number,
  },
  specialRequests: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Booking', bookingSchema);