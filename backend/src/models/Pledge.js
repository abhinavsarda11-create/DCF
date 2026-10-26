const mongoose = require('mongoose');

const pledgeSchema = new mongoose.Schema(
  {
    parentName: {
      type: String,
      required: [true, 'Parent / Caregiver name is required'],
      trim: true,
      maxlength: 120,
    },
    childName: {
      type: String,
      trim: true,
      default: '',
    },
    childGrade: {
      type: String,
      trim: true,
      default: 'Pre-Primary / Primary',
    },
    school: {
      type: String,
      trim: true,
      default: 'South Delhi MCD Primary School',
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
    phone: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      default: 'New Delhi',
      trim: true,
    },
    pledgeYear: {
      type: String,
      default: '2025–2026',
    },
    // The 4 Core Commitments of the Not Yet Parent Pledge
    commitments: {
      noSmartphoneUntilClass9: {
        type: Boolean,
        default: true,
      },
      noSocialMediaUntil16: {
        type: Boolean,
        default: true,
      },
      encourageDeviceFreePlay: {
        type: Boolean,
        default: true,
      },
      supportPhoneFreeClassrooms: {
        type: Boolean,
        default: true,
      },
    },
    status: {
      type: String,
      enum: ['pledged', 'verified', 'archived'],
      default: 'pledged',
    },
    certificateId: {
      type: String,
      unique: true,
      sparse: true,
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate certificate identifier before save
pledgeSchema.pre('save', function (next) {
  if (!this.certificateId) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    this.certificateId = `DCF-NYP-2026-${randomSuffix}`;
  }
  next();
});

module.exports = mongoose.model('Pledge', pledgeSchema);
