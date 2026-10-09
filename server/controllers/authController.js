const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'travelweb_secret_key_2026', {
    expiresIn: '7d',
  });
};

// @desc    Admin login
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password' });
  }

  // Check if server is running in mock mode or mongo mode
  if (req.dbMode === 'mock') {
    if (username === 'admin' && (password === 'admin123' || password === 'admin')) {
      const token = generateToken('mock_admin_id');
      return res.json({
        _id: 'mock_admin_id',
        username: 'admin',
        role: 'admin',
        token,
      });
    } else {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }
  }

  try {
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
const getMe = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  loginUser,
  getMe,
};
