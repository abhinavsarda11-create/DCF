const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth');
const { authorizeAdmin } = require('../middleware/admin');

router.get('/overview', protect, authorizeAdmin, getDashboardStats);

module.exports = router;
