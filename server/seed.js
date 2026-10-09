const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('./models/Destination');
const Review = require('./models/Review');
const Enquiry = require('./models/Enquiry');
const User = require('./models/User');
const { mockDestinations, mockReviews, mockEnquiries } = require('./store/mockData');

dotenv.config();

const seedDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travelweb';
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing
    await Destination.deleteMany({});
    await Review.deleteMany({});
    await Enquiry.deleteMany({});
    await User.deleteMany({});

    // Seed Destinations
    const formattedDestinations = mockDestinations.map(({ _id, ...rest }) => rest);
    await Destination.insertMany(formattedDestinations);
    console.log('Destinations seeded!');

    // Seed Reviews
    const formattedReviews = mockReviews.map(({ _id, ...rest }) => rest);
    await Review.insertMany(formattedReviews);
    console.log('Reviews seeded!');

    // Seed Enquiries
    const formattedEnquiries = mockEnquiries.map(({ _id, ...rest }) => rest);
    await Enquiry.insertMany(formattedEnquiries);
    console.log('Enquiries seeded!');

    // Seed Admin User
    await User.create({
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin user seeded (Username: admin, Password: admin123)');

    console.log('Database Seeding Complete!');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error.message);
    process.exit(1);
  }
};

seedDB();
