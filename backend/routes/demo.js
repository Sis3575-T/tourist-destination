const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

/** Ensures a demo user exists in MongoDB (needed for booking userId refs on Atlas). */
router.get('/user', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      /* Aligns with in-memory bookings fallback (userId: user1) when MongoDB is offline */
      return res.json({
        userId: 'user1',
        user: { name: 'Demo Traveler', email: 'explorer@demo.local' },
        mongoConnected: false,
      });
    }

    let user = await User.findOne({ email: 'demo@ethio-tourist.local' });
    if (!user) {
      user = await User.create({
        name: 'Demo Traveler',
        email: 'demo@ethio-tourist.local',
        password: 'demo-not-used',
      });
    }

    return res.json({
      userId: user._id.toString(),
      user: { name: user.name, email: user.email },
      mongoConnected: true,
    });
  } catch (err) {
    console.error('Demo user error:', err.message);
    return res.status(500).json({ message: 'Could not ensure demo user', error: err.message });
  }
});

module.exports = router;
