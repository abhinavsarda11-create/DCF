const express = require('express');
const router = express.Router();
const {
  submitPledge,
  getPledgeStats,
  getAllPledges,
  verifyPledgeCertificate,
} = require('../controllers/pledge.controller');
const { protect } = require('../middleware/auth');
const { authorizeAdmin } = require('../middleware/admin');

router.post('/', submitPledge);
router.get('/stats', getPledgeStats);
router.get('/verify/:certificateId', verifyPledgeCertificate);
router.get('/', protect, authorizeAdmin, getAllPledges);

module.exports = router;
