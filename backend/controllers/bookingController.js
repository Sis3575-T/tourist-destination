const mongoose = require('mongoose');
const Booking = require('../models/Booking');

// @desc    Get all bookings
// @route   GET /api/bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('destinationId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Get bookings for a specific user
// @route   GET /api/bookings/user/:userId
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('destinationId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { 
      userId, 
      destinationId, 
      date, 
      travelers, 
      specialRequests, 
      destinationPreview,
      name,
      email,
      phone,
      paymentProof
    } = req.body;
    
    // Validate that we have valid ObjectIds if they are provided
    if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }
    if (destinationId && !mongoose.Types.ObjectId.isValid(destinationId)) {
      return res.status(400).json({ message: 'Invalid Destination ID format' });
    }

    const newBooking = new Booking({
      userId: userId || new mongoose.Types.ObjectId(), // Use new ID if missing for demo
      destinationId,
      date,
      travelers,
      specialRequests,
      destinationPreview,
      name,
      email,
      phone,
      paymentProof,
      status: 'pending'
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error('Booking Creation Error:', err);
    res.status(500).json({ 
      message: 'Server Error', 
      error: err.message,
      details: err.errors ? Object.keys(err.errors).map(key => err.errors[key].message) : []
    });
  }
};

// @desc    Update booking status
// @route   PATCH /api/bookings/:id
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (status) booking.status = status;
    const updatedBooking = await booking.save();
    
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
