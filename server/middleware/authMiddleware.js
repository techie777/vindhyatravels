const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'travelweb_secret_key_2026');

      if (req.dbMode === 'mock') {
        req.user = { _id: decoded.id || 'mock_admin_id', username: 'admin', role: 'admin' };
        return next();
      }

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      next();
    } catch (error) {
      if (req.dbMode === 'mock') {
        req.user = { _id: 'mock_admin_id', username: 'admin', role: 'admin' };
        return next();
      }
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    if (req.dbMode === 'mock') {
      req.user = { _id: 'mock_admin_id', username: 'admin', role: 'admin' };
      return next();
    }
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };
