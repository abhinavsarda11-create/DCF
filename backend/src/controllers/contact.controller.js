const inMemoryMessages = [
  {
    _id: 'msg_1',
    name: 'Kavita Nair',
    email: 'kavita.nair@example.com',
    phone: '+91 98199 44332',
    subject: 'Request for ECCE workshop at primary school',
    message: 'We are interested in bringing Parivaar Parivartan Shaala to our local school in South Delhi.',
    status: 'replied',
    createdAt: new Date('2026-02-25T11:00:00Z'),
  },
];

// @desc    Submit contact / inquiry message
// @route   POST /api/contact
// @access  Public
exports.submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields',
      });
    }

    const newMessage = {
      _id: `msg_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      subject: subject?.trim() || 'Parenting & Foundation Query',
      message: message.trim(),
      status: 'new',
      createdAt: new Date(),
    };
    inMemoryMessages.unshift(newMessage);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received by our community team.',
      inquiryId: newMessage._id,
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error sending contact message',
    });
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private/Admin
exports.getAllMessages = async (req, res) => {
  try {
    return res.json({
      success: true,
      count: inMemoryMessages.length,
      messages: inMemoryMessages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching inquiries',
    });
  }
};
