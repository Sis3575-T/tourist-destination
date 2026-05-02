const mongoose = require('mongoose');
const Booking = require('../models/Booking');

// @desc    Get all bookings (admin)
// @route   GET /api/bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('destinationId', 'name location image price')
      .sort({ createdAt: -1 });
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
      .sort({ createdAt: -1 });
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
      userId, destinationId, date, travelers,
      name, email, phone, nationality, specialRequests,
      paymentMethod, paymentProof, totalAmount,
      destinationPreview, servicePreview,
    } = req.body;

    if (userId && !mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: 'Invalid User ID format' });
    if (!destinationId || !mongoose.Types.ObjectId.isValid(destinationId))
      return res.status(400).json({ message: 'Invalid or missing Destination ID' });
    if (!date)  return res.status(400).json({ message: 'Travel date is required' });
    if (!name)  return res.status(400).json({ message: 'Traveler name is required' });
    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!phone) return res.status(400).json({ message: 'Phone is required' });

    const booking = await Booking.create({
      userId: (userId && mongoose.Types.ObjectId.isValid(userId))
        ? userId : new mongoose.Types.ObjectId(),
      destinationId,
      date,
      travelers:       Number(travelers) || 1,
      name,
      email,
      phone,
      nationality:     nationality || '',
      specialRequests: specialRequests || '',
      paymentMethod:   paymentMethod || '',
      paymentProof:    paymentProof || '',
      paymentProofData: paymentProofData || '',
      paymentProofType: paymentProofType || '',
      totalAmount:     Number(totalAmount) || 0,
      destinationPreview: destinationPreview || {},
      servicePreview:     servicePreview || {},
      status: 'pending',
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error('Booking Creation Error:', err);
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
};

// @desc    Admin: approve or reject a booking
// @route   PATCH /api/bookings/:id/review
exports.reviewBooking = async (req, res) => {
  try {
    const { action, adminNote, rejectionReason, reviewedBy } = req.body;
    // action: 'approve' | 'reject'
    if (!['approve', 'reject'].includes(action))
      return res.status(400).json({ message: 'action must be approve or reject' });

    const newStatus = action === 'approve' ? 'confirmed' : 'cancelled';

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: newStatus,
        adminNote:       adminNote || '',
        rejectionReason: action === 'reject' ? (rejectionReason || 'Payment not verified') : '',
        reviewedAt:      new Date(),
        reviewedBy:      reviewedBy || 'Admin',
      },
      { new: true }
    );

    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Update booking status (general)
// @route   PATCH /api/bookings/:id
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
