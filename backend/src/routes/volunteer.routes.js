const express = require('express');
const router = express.Router();
const {
  submitVolunteer,
  getAllVolunteers,
  updateVolunteerStatus,
} = require('../controllers/volunteer.controller');
const { protect } = require('../middleware/auth');
const { authorizeAdmin } = require('../middleware/admin');

router.post('/', submitVolunteer);
router.get('/', protect, authorizeAdmin, getAllVolunteers);
router.patch('/:id/status', protect, authorizeAdmin, updateVolunteerStatus);

module.exports = router;
