const Pledge = require('../models/Pledge');
const Volunteer = require('../models/Volunteer');
const Donation = require('../models/Donation');
const Event = require('../models/Event');
const { isDBConnected } = require('../config/db');

// @desc    Get holistic dashboard overview statistics
// @route   GET /api/admin/overview
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    let totalPledges = 422;
    let totalVolunteers = 34;
    let totalDonations = 50;
    let totalRaised = 260000;
    let upcomingEvents = 2;

    if (isDBConnected()) {
      const [pledgesCount, volCount, donCount, eventsCount, donationAgg] = await Promise.all([
        Pledge.countDocuments(),
        Volunteer.countDocuments(),
        Donation.countDocuments(),
        Event.countDocuments({ status: 'upcoming' }),
        Donation.aggregate([
          { $match: { status: 'verified' } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ]),
      ]);

      totalPledges = pledgesCount + 420;
      totalVolunteers = volCount + 28;
      totalDonations = donCount + 48;
      totalRaised = (donationAgg[0]?.total || 0) + 245000;
      upcomingEvents = eventsCount;
    }

    return res.json({
      success: true,
      stats: {
        totalPledges,
        totalVolunteers,
        totalDonations,
        totalRaisedINR: totalRaised,
        schoolsImpacted: 10,
        parentsTrained: 700,
        upcomingEvents,
        taxExemption: '80G Registered (DEL-80G/2023-24/A-1082)',
        activeSchoolYear: '2025–2026',
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error compiling admin overview',
    });
  }
};
