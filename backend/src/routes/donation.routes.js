const express = require('express');
const router = express.Router();
const {
  recordDonation,
  getDonationStats,
  getAllDonations,
} = require('../controllers/donation.controller');
const { protect } = require('../middleware/auth');
const { authorizeAdmin } = require('../middleware/admin');

router.post('/', recordDonation);
router.get('/stats', getDonationStats);
router.get('/', protect, authorizeAdmin, getAllDonations);

module.exports = router;
