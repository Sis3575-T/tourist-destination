const express = require('express');
const router = express.Router();
const {
  getBookings,
  getUserBookings,
  createBooking,
  updateBookingStatus
} = require('../controllers/bookingController');

// GET all bookings
router.get('/', getBookings);

// GET bookings for a user
router.get('/user/:userId', getUserBookings);

// POST new booking
router.post('/', createBooking);

// UPDATE booking status
router.patch('/:id', updateBookingStatus);

module.exports = router;