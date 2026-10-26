const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    rolePreference: {
      type: String,
      enum: [
        'ECCE Educator / Teacher Mentor',
        'Storyteller & Creative Arts Lead',
        'Child Psychologist / Counselor',
        'Parent Engagement Group (PEG) Coordinator',
        'Event & School Workshop Coordinator',
        'Digital & Community Outreach',
        'General Volunteer',
      ],
      default: 'General Volunteer',
    },
    availability: {
      type: String,
      enum: ['Weekdays', 'Weekends', 'Flexible (4-6 hrs/week)', 'Full-Time Project'],
      default: 'Weekends',
    },
    preferredSchools: {
      type: [String],
      default: ['South Delhi MCD Primary Schools (Chirag Dilli / Hauz Rani / Malviya Nagar)'],
    },
    experience: {
      type: String,
      default: '',
    },
    motivation: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'interviewed', 'onboarded', 'inactive'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Volunteer', volunteerSchema);
