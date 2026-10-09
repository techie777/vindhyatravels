const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: [true, 'Review comment is required']
  },
  location: {
    type: String,
    default: 'Traveler'
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  approved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
