const express = require('express');
const router = express.Router();
const {
  getBookings,
  getUserBookings,
  createBooking,
  reviewBooking,
  updateBookingStatus,
} = require('../controllers/bookingController');

router.get('/',                getBookings);
router.get('/user/:userId',    getUserBookings);
router.post('/',               createBooking);
router.patch('/:id/review',    reviewBooking);   // Admin approve/reject
router.patch('/:id',           updateBookingStatus);

module.exports = router;
