const Volunteer = require('../models/Volunteer');
const { isDBConnected } = require('../config/db');

// In-memory fallback volunteers
const inMemoryVolunteers = [
  {
    _id: 'vol_1',
    fullName: 'Pooja Iyer',
    email: 'pooja.iyer@example.com',
    phone: '+91 98201 11223',
    rolePreference: 'Storyteller & Creative Arts Lead',
    availability: 'Weekends',
    preferredSchools: ['South Delhi MCD Primary Schools (Chirag Dilli)'],
    experience: '3 years volunteering with early childhood literacy groups',
    motivation: 'Passionate about nurturing emotional expression through folk tales',
    status: 'onboarded',
    createdAt: new Date('2026-01-20T08:00:00Z'),
  },
  {
    _id: 'vol_2',
    fullName: 'Arun Mehra',
    email: 'arun.mehra@example.com',
    phone: '+91 97112 44556',
    rolePreference: 'Parent Engagement Group (PEG) Coordinator',
    availability: 'Flexible (4-6 hrs/week)',
    preferredSchools: ['MCD Primary School, Hauz Rani'],
    experience: 'Community workshop facilitator in Delhi NCR',
    motivation: 'To strengthen parent-teacher harmony in primary schools',
    status: 'pending',
    createdAt: new Date('2026-02-10T11:15:00Z'),
  },
];

// @desc    Submit Volunteer Application
// @route   POST /api/volunteer
// @access  Public
exports.submitVolunteer = async (req, res) => {
  try {
    const { fullName, email, phone, rolePreference, availability, preferredSchools, experience, motivation } = req.body;

    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and contact number are required to submit volunteer application',
      });
    }

    if (isDBConnected()) {
      const volunteer = await Volunteer.create({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        rolePreference: rolePreference || 'General Volunteer',
        availability: availability || 'Weekends',
        preferredSchools: Array.isArray(preferredSchools) ? preferredSchools : ['South Delhi MCD Primary Schools'],
        experience: experience || '',
        motivation: motivation || '',
        status: 'pending',
      });

      return res.status(201).json({
        success: true,
        message: 'Thank you for stepping forward! Your volunteer registration has been received. Our community coordinator will contact you shortly.',
        volunteer: {
          id: volunteer._id,
          fullName: volunteer.fullName,
          rolePreference: volunteer.rolePreference,
          status: volunteer.status,
          registeredAt: volunteer.createdAt,
        },
      });
    }

    // In-memory fallback
    const newVolunteer = {
      _id: `vol_${Date.now()}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      rolePreference: rolePreference || 'General Volunteer',
      availability: availability || 'Weekends',
      preferredSchools: Array.isArray(preferredSchools) ? preferredSchools : ['South Delhi MCD Primary Schools'],
      experience: experience || '',
      motivation: motivation || '',
      status: 'pending',
      createdAt: new Date(),
    };
    inMemoryVolunteers.unshift(newVolunteer);

    return res.status(201).json({
      success: true,
      message: 'Thank you for stepping forward! Your volunteer registration has been received (in-memory mode).',
      volunteer: {
        id: newVolunteer._id,
        fullName: newVolunteer.fullName,
        rolePreference: newVolunteer.rolePreference,
        status: newVolunteer.status,
        registeredAt: newVolunteer.createdAt,
      },
    });
  } catch (error) {
    console.error('Volunteer registration error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error processing volunteer application',
    });
  }
};

// @desc    Get all volunteer registrations (Admin)
// @route   GET /api/volunteer
// @access  Private/Admin
exports.getAllVolunteers = async (req, res) => {
  try {
    if (isDBConnected()) {
      const volunteers = await Volunteer.find().sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: volunteers.length,
        volunteers,
      });
    }

    return res.json({
      success: true,
      count: inMemoryVolunteers.length,
      volunteers: inMemoryVolunteers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching volunteer registrations',
    });
  }
};

// @desc    Update volunteer status (Admin)
// @route   PATCH /api/volunteer/:id/status
// @access  Private/Admin
exports.updateVolunteerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'contacted', 'interviewed', 'onboarded', 'inactive'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    if (isDBConnected()) {
      const volunteer = await Volunteer.findByIdAndUpdate(id, { status }, { new: true });
      if (!volunteer) {
        return res.status(404).json({ success: false, message: 'Volunteer record not found' });
      }
      return res.json({ success: true, volunteer });
    }

    const vol = inMemoryVolunteers.find((v) => v._id === id);
    if (!vol) {
      return res.status(404).json({ success: false, message: 'Volunteer record not found' });
    }
    vol.status = status;
    return res.json({ success: true, volunteer: vol });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error updating volunteer status',
    });
  }
};
