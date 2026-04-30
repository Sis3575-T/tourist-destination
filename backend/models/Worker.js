const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'on leave', 'inactive'],
    default: 'active'
  },
  hiredDate: {
    type: Date,
    default: Date.now
  },
  payments: [{
    amount: Number,
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['paid', 'pending'], default: 'paid' },
    period: String
  }],
  attendance: [{
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['present', 'absent', 'late'], default: 'present' },
    note: String
  }]
}, {
  timestamps: true,
});

module.exports = mongoose.model('Worker', workerSchema);
