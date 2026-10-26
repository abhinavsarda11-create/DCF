const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'Parivaar Parivartan Shaala (10-Week Workshop)',
        'Parenting Circle',
        'MCD School Community Camp',
        'Teacher ECCE Training',
        'Digital Screen Time Awareness',
      ],
      default: 'Parivaar Parivartan Shaala (10-Week Workshop)',
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    location: {
      type: String,
      default: 'MCD Primary School, Chirag Dilli, New Delhi',
    },
    dateTime: {
      type: Date,
      required: [true, 'Event date and time is required'],
    },
    durationHours: {
      type: Number,
      default: 2,
    },
    capacity: {
      type: Number,
      default: 60,
    },
    registeredCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['upcoming', 'in-progress', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    facilitator: {
      type: String,
      default: 'Dawn Child Foundation ECCE Mentors',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Event', eventSchema);
