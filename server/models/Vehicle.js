const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vehicle name is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['Sedan', 'MUV/SUV', 'Van/Bus'],
    required: [true, 'Category is required']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  seats: {
    type: String,
    required: [true, 'Seating capacity is required']
  },
  acType: {
    type: String,
    default: 'Air Conditioned (Dual AC)'
  },
  luggage: {
    type: String,
    default: '2-3 Large Bags'
  },
  ratePerKm: {
    type: Number,
    required: [true, 'Rate per KM / daily is required']
  },
  dailyDriverBatta: {
    type: Number,
    default: 300
  },
  description: {
    type: String,
    default: ''
  },
  features: {
    type: [String],
    default: ['AC', 'Music System', 'Experienced Driver', 'Clean Interior']
  },
  popular: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
