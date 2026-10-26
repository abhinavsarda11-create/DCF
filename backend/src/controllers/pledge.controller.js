const Pledge = require('../models/Pledge');
const { isDBConnected } = require('../config/db');

// In-memory fallback pledges
const inMemoryPledges = [
  {
    _id: 'pld_1',
    parentName: 'Sunita Sharma',
    childName: 'Aarav Sharma',
    childGrade: 'Class 2',
    school: 'MCD Primary School, Chirag Dilli',
    city: 'New Delhi',
    pledgeYear: '2025–2026',
    commitments: {
      noSmartphoneUntilClass9: true,
      noSocialMediaUntil16: true,
      encourageDeviceFreePlay: true,
      supportPhoneFreeClassrooms: true,
    },
    certificateId: 'DCF-NYP-2026-8821',
    status: 'pledged',
    createdAt: new Date('2026-02-15T10:00:00Z'),
  },
  {
    _id: 'pld_2',
    parentName: 'Rajesh Verma',
    childName: 'Ananya Verma',
    childGrade: 'Class 4',
    school: 'MCD Primary School, Hauz Rani',
    city: 'New Delhi',
    pledgeYear: '2025–2026',
    commitments: {
      noSmartphoneUntilClass9: true,
      noSocialMediaUntil16: true,
      encourageDeviceFreePlay: true,
      supportPhoneFreeClassrooms: true,
    },
    certificateId: 'DCF-NYP-2026-9043',
    status: 'pledged',
    createdAt: new Date('2026-03-01T14:30:00Z'),
  },
];

// @desc    Submit "Not Yet" Parent Pledge
// @route   POST /api/pledge
// @access  Public
exports.submitPledge = async (req, res) => {
  try {
    const { parentName, childName, childGrade, school, email, phone, city, commitments } = req.body;

    if (!parentName || parentName.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Parent or caregiver name is required to complete the pledge',
      });
    }

    const defaultCommitments = {
      noSmartphoneUntilClass9: commitments?.noSmartphoneUntilClass9 ?? true,
      noSocialMediaUntil16: commitments?.noSocialMediaUntil16 ?? true,
      encourageDeviceFreePlay: commitments?.encourageDeviceFreePlay ?? true,
      supportPhoneFreeClassrooms: commitments?.supportPhoneFreeClassrooms ?? true,
    };

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    if (isDBConnected()) {
      const pledge = await Pledge.create({
        parentName: parentName.trim(),
        childName: childName?.trim() || '',
        childGrade: childGrade?.trim() || 'Primary',
        school: school?.trim() || 'South Delhi MCD Primary School',
        email: email?.trim() || '',
        phone: phone?.trim() || '',
        city: city?.trim() || 'New Delhi',
        pledgeYear: '2025–2026',
        commitments: defaultCommitments,
        ipAddress: typeof clientIp === 'string' ? clientIp.split(',')[0] : '',
      });

      return res.status(201).json({
        success: true,
        message: 'Congratulations! Your "Not Yet" Parent Pledge has been recorded successfully.',
        pledge: {
          id: pledge._id,
          parentName: pledge.parentName,
          childName: pledge.childName,
          school: pledge.school,
          certificateId: pledge.certificateId,
          pledgeYear: pledge.pledgeYear,
          pledgedAt: pledge.createdAt,
        },
      });
    }

    // In-memory fallback
    const certificateId = `DCF-NYP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPledge = {
      _id: `pld_${Date.now()}`,
      parentName: parentName.trim(),
      childName: childName?.trim() || '',
      childGrade: childGrade?.trim() || 'Primary',
      school: school?.trim() || 'South Delhi MCD Primary School',
      email: email?.trim() || '',
      phone: phone?.trim() || '',
      city: city?.trim() || 'New Delhi',
      pledgeYear: '2025–2026',
      commitments: defaultCommitments,
      certificateId,
      status: 'pledged',
      createdAt: new Date(),
    };
    inMemoryPledges.unshift(newPledge);

    return res.status(201).json({
      success: true,
      message: 'Congratulations! Your "Not Yet" Parent Pledge has been recorded successfully (in-memory mode).',
      pledge: {
        id: newPledge._id,
        parentName: newPledge.parentName,
        childName: newPledge.childName,
        school: newPledge.school,
        certificateId: newPledge.certificateId,
        pledgeYear: newPledge.pledgeYear,
        pledgedAt: newPledge.createdAt,
      },
    });
  } catch (error) {
    console.error('Submit pledge error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error recording parent pledge',
    });
  }
};

// @desc    Get pledge summary statistics (public metrics)
// @route   GET /api/pledge/stats
// @access  Public
exports.getPledgeStats = async (req, res) => {
  try {
    if (isDBConnected()) {
      const count = await Pledge.countDocuments();
      return res.json({
        success: true,
        stats: {
          totalPledges: count + 420, // Grounded community baseline from 10 MCD primary schools
          activeSchoolYear: '2025–2026',
          targetMilestone: 1000,
          districtsCovered: ['Chirag Dilli', 'Hauz Rani', 'Malviya Nagar', 'Greater Kailash'],
        },
      });
    }

    return res.json({
      success: true,
      stats: {
        totalPledges: inMemoryPledges.length + 420,
        activeSchoolYear: '2025–2026',
        targetMilestone: 1000,
        districtsCovered: ['Chirag Dilli', 'Hauz Rani', 'Malviya Nagar', 'Greater Kailash'],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching pledge statistics',
    });
  }
};

// @desc    Get all pledges (Admin view)
// @route   GET /api/pledge
// @access  Private/Admin
exports.getAllPledges = async (req, res) => {
  try {
    if (isDBConnected()) {
      const pledges = await Pledge.find().sort({ createdAt: -1 }).limit(100);
      return res.json({
        success: true,
        count: pledges.length,
        pledges,
      });
    }

    return res.json({
      success: true,
      count: inMemoryPledges.length,
      pledges: inMemoryPledges,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving pledges',
    });
  }
};

// @desc    Verify a pledge by Certificate ID
// @route   GET /api/pledge/verify/:certificateId
// @access  Public
exports.verifyPledgeCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    if (isDBConnected()) {
      const pledge = await Pledge.findOne({ certificateId });
      if (!pledge) {
        return res.status(404).json({
          success: false,
          message: 'No active parent pledge found with this Certificate ID',
        });
      }
      return res.json({
        success: true,
        valid: true,
        pledge: {
          parentName: pledge.parentName,
          school: pledge.school,
          pledgeYear: pledge.pledgeYear,
          date: pledge.createdAt,
          certificateId: pledge.certificateId,
        },
      });
    }

    const pledge = inMemoryPledges.find((p) => p.certificateId === certificateId);
    if (!pledge) {
      return res.status(404).json({
        success: false,
        message: 'No active parent pledge found with this Certificate ID',
      });
    }

    return res.json({
      success: true,
      valid: true,
      pledge: {
        parentName: pledge.parentName,
        school: pledge.school,
        pledgeYear: pledge.pledgeYear,
        date: pledge.createdAt,
        certificateId: pledge.certificateId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error verifying certificate',
    });
  }
};
