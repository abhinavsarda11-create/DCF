const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { isDBConnected } = require('../config/db');

// In-memory user store for dev/testing when MongoDB is not connected
const inMemoryUsers = [
  {
    _id: 'admin_seed_1',
    name: 'Foundation Director',
    email: 'admin@dawnchildfoundation.org',
    passwordHash: '$2a$10$X7vHqvqH4eI8uJzYd/r.teU4Yk5e6Xw/w7g1uR8aWv5w.Zk1e6LKm', // DawnAdmin2026!
    role: 'admin',
    phone: '+91 98110 00000',
    isActive: true,
  },
];

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || 'dawn_child_foundation_super_secret_jwt_key_2026_xyz';
  return jwt.sign(
    {
      id: user._id || user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    secret,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d',
    }
  );
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    if (isDBConnected()) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'An account with this email already exists',
        });
      }

      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        phone: phone || '',
        role: role === 'admin' ? 'user' : role || 'user', // Protect direct admin self-assignment
      });

      const token = generateToken(user);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    // In-memory fallback
    const exists = inMemoryUsers.find((u) => u.email === email.toLowerCase());
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = {
      _id: `user_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      passwordHash,
      phone: phone || '',
      role: role || 'user',
      isActive: true,
    };
    inMemoryUsers.push(newUser);

    const token = generateToken(newUser);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully (in-memory mode)',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration',
    });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    if (isDBConnected()) {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }

      const token = generateToken(user);

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    // In-memory fallback
    const user = inMemoryUsers.find((u) => u.email === email.toLowerCase());
    if (!user) {
      // Check if it matches default admin
      if (email.toLowerCase() === 'admin@dawnchildfoundation.org' && password === 'DawnAdmin2026!') {
        const token = generateToken(inMemoryUsers[0]);
        return res.json({
          success: true,
          message: 'Admin login successful',
          token,
          user: {
            id: inMemoryUsers[0]._id,
            name: inMemoryUsers[0].name,
            email: inMemoryUsers[0].email,
            role: inMemoryUsers[0].role,
          },
        });
      }

      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login',
    });
  }
};

// @desc    Get currently logged-in user profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    return res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch user profile',
    });
  }
};
