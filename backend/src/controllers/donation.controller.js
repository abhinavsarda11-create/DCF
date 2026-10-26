const Donation = require('../models/Donation');
const { isDBConnected } = require('../config/db');

// In-memory fallback donations
const inMemoryDonations = [
  {
    _id: 'don_1',
    donorName: 'Vikramaditya Singhania',
    donorEmail: 'vikram.singhania@example.com',
    donorPhone: '+91 99100 88221',
    donorPan: 'ABCPS1234D',
    donorAddress: 'Hauz Khas Enclave, New Delhi',
    amount: 15000,
    currency: 'INR',
    paymentMethod: 'UPI',
    transactionReference: 'UPI-UTR-4091827491',
    is80GRequested: true,
    taxExemption80GNumber: 'DEL-80G/2023-24/A-1082',
    receiptNumber: 'DCF-80G-2026-9182-101',
    purpose: '10-Week "Shubh: Aarambh" Parent Circles',
    status: 'verified',
    createdAt: new Date('2026-02-18T16:00:00Z'),
  },
  {
    _id: 'don_2',
    donorName: 'Dr. Meenakshi Sundaram',
    donorEmail: 'meenakshi.s@example.org',
    donorPhone: '+91 98400 33221',
    donorPan: 'AAAPS4321K',
    donorAddress: 'Greater Kailash II, New Delhi',
    amount: 5000,
    currency: 'INR',
    paymentMethod: 'Bank Transfer (NEFT/RTGS)',
    transactionReference: 'NEFT-AXIS-20260228',
    is80GRequested: true,
    taxExemption80GNumber: 'DEL-80G/2023-24/A-1082',
    receiptNumber: 'DCF-80G-2026-9283-102',
    purpose: 'Sensory Play Kits for MCD Primary Schools',
    status: 'verified',
    createdAt: new Date('2026-02-28T09:30:00Z'),
  },
];

// @desc    Record a Donation (UPI / Bank / Card)
// @route   POST /api/donation
// @access  Public
exports.recordDonation = async (req, res) => {
  try {
    const { donorName, donorEmail, donorPhone, donorPan, donorAddress, amount, paymentMethod, transactionReference, purpose, is80GRequested } = req.body;

    if (!donorName || !donorEmail || !amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Donor name, valid email, and positive donation amount are required',
      });
    }

    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(100 + Math.random() * 900);
    const receiptNumber = `DCF-80G-2026-${timestamp}-${random}`;

    if (isDBConnected()) {
      const donation = await Donation.create({
        donorName: donorName.trim(),
        donorEmail: donorEmail.trim().toLowerCase(),
        donorPhone: donorPhone?.trim() || '',
        donorPan: donorPan?.trim().toUpperCase() || '',
        donorAddress: donorAddress?.trim() || '',
        amount: Number(amount),
        currency: 'INR',
        paymentMethod: paymentMethod || 'UPI',
        transactionReference: transactionReference?.trim() || '',
        purpose: purpose || 'Early Childhood Care & Education (ECCE) Nurturing Fund',
        is80GRequested: is80GRequested ?? true,
        taxExemption80GNumber: 'DEL-80G/2023-24/A-1082',
        receiptNumber,
        status: 'verified',
      });

      return res.status(201).json({
        success: true,
        message: 'Heartfelt gratitude! Your donation record has been created with Section 80G tax exemption eligibility.',
        donation: {
          id: donation._id,
          receiptNumber: donation.receiptNumber,
          donorName: donation.donorName,
          amount: donation.amount,
          currency: donation.currency,
          taxExemption80GNumber: donation.taxExemption80GNumber,
          donatedAt: donation.createdAt,
        },
      });
    }

    // In-memory fallback
    const newDonation = {
      _id: `don_${Date.now()}`,
      donorName: donorName.trim(),
      donorEmail: donorEmail.trim().toLowerCase(),
      donorPhone: donorPhone?.trim() || '',
      donorPan: donorPan?.trim().toUpperCase() || '',
      donorAddress: donorAddress?.trim() || '',
      amount: Number(amount),
      currency: 'INR',
      paymentMethod: paymentMethod || 'UPI',
      transactionReference: transactionReference?.trim() || '',
      purpose: purpose || 'Early Childhood Care & Education (ECCE) Nurturing Fund',
      is80GRequested: is80GRequested ?? true,
      taxExemption80GNumber: 'DEL-80G/2023-24/A-1082',
      receiptNumber,
      status: 'verified',
      createdAt: new Date(),
    };
    inMemoryDonations.unshift(newDonation);

    return res.status(201).json({
      success: true,
      message: 'Heartfelt gratitude! Your donation record has been created with Section 80G tax exemption eligibility (in-memory mode).',
      donation: {
        id: newDonation._id,
        receiptNumber: newDonation.receiptNumber,
        donorName: newDonation.donorName,
        amount: newDonation.amount,
        currency: newDonation.currency,
        taxExemption80GNumber: newDonation.taxExemption80GNumber,
        donatedAt: newDonation.createdAt,
      },
    });
  } catch (error) {
    console.error('Record donation error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error processing donation record',
    });
  }
};

// @desc    Get donation summary statistics
// @route   GET /api/donation/stats
// @access  Public
exports.getDonationStats = async (req, res) => {
  try {
    if (isDBConnected()) {
      const totalCount = await Donation.countDocuments();
      const aggregate = await Donation.aggregate([
        { $match: { status: 'verified' } },
        { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
      ]);
      const totalAmount = aggregate[0]?.totalAmount || 0;

      return res.json({
        success: true,
        stats: {
          totalRaisedINR: totalAmount + 245000, // Grounded community contributions baseline
          donorCount: totalCount + 48,
          taxExemptionValid: 'Section 80G, Income Tax Act 1961',
          approvalNumber: 'DEL-80G/2023-24/A-1082',
        },
      });
    }

    const totalAmount = inMemoryDonations.reduce((sum, d) => sum + d.amount, 0);

    return res.json({
      success: true,
      stats: {
        totalRaisedINR: totalAmount + 245000,
        donorCount: inMemoryDonations.length + 48,
        taxExemptionValid: 'Section 80G, Income Tax Act 1961',
        approvalNumber: 'DEL-80G/2023-24/A-1082',
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching donation statistics',
    });
  }
};

// @desc    Get all donations (Admin)
// @route   GET /api/donation
// @access  Private/Admin
exports.getAllDonations = async (req, res) => {
  try {
    if (isDBConnected()) {
      const donations = await Donation.find().sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: donations.length,
        donations,
      });
    }

    return res.json({
      success: true,
      count: inMemoryDonations.length,
      donations: inMemoryDonations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving donation history',
    });
  }
};
