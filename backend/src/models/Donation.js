const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: [true, 'Donor name is required'],
      trim: true,
      maxlength: 120,
    },
    donorEmail: {
      type: String,
      required: [true, 'Donor email is required'],
      trim: true,
      lowercase: true,
    },
    donorPhone: {
      type: String,
      trim: true,
      default: '',
    },
    donorPan: {
      type: String,
      trim: true,
      uppercase: true,
      default: '',
    },
    donorAddress: {
      type: String,
      trim: true,
      default: '',
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [1, 'Amount must be greater than zero'],
    },
    currency: {
      type: String,
      default: 'INR',
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Bank Transfer (NEFT/RTGS)', 'Cheque', 'Credit/Debit Card', 'Other'],
      default: 'UPI',
    },
    transactionReference: {
      type: String,
      trim: true,
      default: '',
    },
    is80GRequested: {
      type: Boolean,
      default: true,
    },
    taxExemption80GNumber: {
      type: String,
      default: 'DEL-80G/2023-24/A-1082',
    },
    receiptNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    purpose: {
      type: String,
      default: 'Early Childhood Care & Education (ECCE) Nurturing Fund',
    },
    status: {
      type: String,
      enum: ['initiated', 'verified', 'completed', 'failed'],
      default: 'verified',
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate official 80G receipt number if not provided
donationSchema.pre('save', function (next) {
  if (!this.receiptNumber) {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(100 + Math.random() * 900);
    this.receiptNumber = `DCF-80G-2026-${timestamp}-${random}`;
  }
  next();
});

module.exports = mongoose.model('Donation', donationSchema);
