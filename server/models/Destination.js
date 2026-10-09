const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Destination title is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['MP', 'India'],
    required: [true, 'Category must be either MP or India']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  location: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    default: 4.8,
    min: 0,
    max: 5
  },
  reviewsCount: {
    type: Number,
    default: 24
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  highlights: {
    type: [String],
    default: []
  },
  inclusions: {
    type: [String],
    default: ['Hotel Stay', 'Guided Tours', 'Breakfast', 'Transport']
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Destination', destinationSchema);
