const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. Please log in with a valid Bearer token.',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'dawn_child_foundation_super_secret_jwt_key_2026_xyz';
    const decoded = jwt.verify(token, secret);

    // Fetch user from DB if connected, or use token payload
    try {
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = user;
        return next();
      }
    } catch {
      // In-memory or fallback mode
    }

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role || 'user',
      name: decoded.name || 'Dawn Foundation Member',
    };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authorization token.',
    });
  }
};

module.exports = { protect };
