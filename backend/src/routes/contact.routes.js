const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getAllMessages,
} = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth');
const { authorizeAdmin } = require('../middleware/admin');

router.post('/', submitContactMessage);
router.get('/', protect, authorizeAdmin, getAllMessages);

module.exports = router;
