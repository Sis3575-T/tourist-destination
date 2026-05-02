const express = require('express');
const router = express.Router();
const {
  getMessages,
  createMessage,
  replyMessage,
  markRead,
  getMessagesByEmail,
} = require('../controllers/messageController');

router.get('/',                    getMessages);
router.post('/',                   createMessage);
router.get('/email/:email',        getMessagesByEmail);
router.patch('/:id/reply',         replyMessage);
router.patch('/:id/read',          markRead);

module.exports = router;
