const Message = require('../models/Message');
const { sendMessageReply } = require('../utils/emailService');

// @desc  Get all messages (admin)
// @route GET /api/messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc  Create a message (traveler)
// @route POST /api/messages
exports.createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message, bookingId } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' });
    }
    const msg = await Message.create({ name, email, phone, subject, message, bookingId: bookingId || null });
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc  Admin replies to a message
// @route PATCH /api/messages/:id/reply
exports.replyMessage = async (req, res) => {
  try {
    const { adminReply } = req.body;
    if (!adminReply) return res.status(400).json({ message: 'Reply text is required' });
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { adminReply, status: 'replied', repliedAt: new Date() },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: 'Message not found' });

    // Send real email reply to traveler
    sendMessageReply({
      to:              msg.email,
      name:            msg.name,
      subject:         msg.subject,
      originalMessage: msg.message,
      adminReply,
    });

    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc  Mark message as read
// @route PATCH /api/messages/:id/read
exports.markRead = async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc  Get messages by email (traveler checks their replies)
// @route GET /api/messages/email/:email
exports.getMessagesByEmail = async (req, res) => {
  try {
    const messages = await Message.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
