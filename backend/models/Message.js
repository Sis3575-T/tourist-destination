const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  // Sender info
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  phone:   { type: String, default: '' },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },

  // Admin response
  adminReply:   { type: String, default: '' },
  repliedAt:    { type: Date },
  status:       { type: String, enum: ['unread', 'read', 'replied'], default: 'unread' },

  // Optional booking reference
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', default: null },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
