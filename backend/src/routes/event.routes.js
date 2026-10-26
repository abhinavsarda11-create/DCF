const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEventById,
  registerForEvent,
  createEvent,
} = require('../controllers/event.controller');
const { protect } = require('../middleware/auth');
const { authorizeAdmin } = require('../middleware/admin');

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/:id/register', registerForEvent);
router.post('/', protect, authorizeAdmin, createEvent);

module.exports = router;
