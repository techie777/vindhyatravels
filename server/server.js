const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

let isMongoConnected = false;

// Attempt Mongoose Connection with graceful fallback
const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travelweb';
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log('✅ Connected to MongoDB successfully.');
  } catch (err) {
    isMongoConnected = false;
    console.log('⚠️ Local MongoDB not detected. Operating seamlessly with In-Memory Mock Database Store.');
  }
};

connectDB();

// Attach DB mode to request
app.use((req, res, next) => {
  req.dbMode = isMongoConnected ? 'mongo' : 'mock';
  next();
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');

// Bind Routes
app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'Vindhyanchal Travels API',
    dbMode: req.dbMode,
    timestamp: new Date().toISOString()
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Vindhyanchal Travels API Server running on port ${PORT}`);
  });
}

module.exports = app;
