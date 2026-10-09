const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    default: 'quicklead@vindhyanchal.com',
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'Destination of interest is required']
  },
  travelDate: {
    type: String,
    default: 'As Soon As Possible'
  },
  travelersCount: {
    type: Number,
    default: 2
  },
  travelStyle: {
    type: String,
    default: 'Standard'
  },
  estimatedCost: {
    type: Number,
    default: 0
  },
  specialRequests: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Confirmed'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Enquiry', enquirySchema);
