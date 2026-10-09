const Vehicle = require('../models/Vehicle');
let { mockVehicles, mockHeroSettings } = require('../store/mockData');

// @desc    Get all vehicles
// @route   GET /api/vehicles
const getVehicles = async (req, res) => {
  const { category, search } = req.query;

  if (req.dbMode === 'mock') {
    let list = [...mockVehicles];
    if (category && category !== 'All') {
      list = list.filter((v) => v.category.toLowerCase().includes(category.toLowerCase()));
    }
    if (search) {
      list = list.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));
    }
    return res.json(list);
  }

  try {
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new vehicle (Admin)
// @route   POST /api/vehicles
const createVehicle = async (req, res) => {
  const { name, category, image, seats, acType, luggage, ratePerKm, dailyDriverBatta, description, features, popular } = req.body;

  if (!name || !category || !seats || !ratePerKm) {
    return res.status(400).json({ message: 'Name, category, seats, and rate per KM are required.' });
  }

  if (req.dbMode === 'mock') {
    const newVeh = {
      _id: 'veh_' + Date.now(),
      name,
      category,
      image: image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
      seats,
      acType: acType || 'Air Conditioned',
      luggage: luggage || '2-3 Bags',
      ratePerKm: Number(ratePerKm),
      dailyDriverBatta: Number(dailyDriverBatta) || 300,
      description: description || '',
      features: Array.isArray(features) ? features : (features ? features.split(',') : ['AC', 'Experienced Chauffeur']),
      popular: Boolean(popular),
      createdAt: new Date().toISOString()
    };
    mockVehicles.unshift(newVeh);
    return res.status(201).json(newVeh);
  }

  try {
    const vehicle = new Vehicle({
      name,
      category,
      image,
      seats,
      acType,
      luggage,
      ratePerKm: Number(ratePerKm),
      dailyDriverBatta: Number(dailyDriverBatta) || 300,
      description,
      features: Array.isArray(features) ? features : (features ? features.split(',') : []),
      popular: Boolean(popular)
    });

    const createdVehicle = await vehicle.save();
    res.status(201).json(createdVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update vehicle (Admin)
// @route   PUT /api/vehicles/:id
const updateVehicle = async (req, res) => {
  if (req.dbMode === 'mock') {
    const index = mockVehicles.findIndex((v) => v._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Vehicle not found' });

    mockVehicles[index] = {
      ...mockVehicles[index],
      ...req.body,
      ratePerKm: req.body.ratePerKm ? Number(req.body.ratePerKm) : mockVehicles[index].ratePerKm,
      features: req.body.features 
        ? (Array.isArray(req.body.features) ? req.body.features : req.body.features.split(','))
        : mockVehicles[index].features
    };
    return res.json(mockVehicles[index]);
  }

  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle) {
      Object.assign(vehicle, req.body);
      const updated = await vehicle.save();
      res.json(updated);
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete vehicle (Admin)
// @route   DELETE /api/vehicles/:id
const deleteVehicle = async (req, res) => {
  if (req.dbMode === 'mock') {
    const index = mockVehicles.findIndex((v) => v._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Vehicle not found' });
    mockVehicles.splice(index, 1);
    return res.json({ message: 'Vehicle removed' });
  }

  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle) {
      await vehicle.deleteOne();
      res.json({ message: 'Vehicle removed' });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Hero Control Settings
// @route   GET /api/hero
const getHeroSettings = async (req, res) => {
  res.json(mockHeroSettings);
};

// @desc    Update Hero Control Settings (Admin image/headline upload control)
// @route   PUT /api/hero
const updateHeroSettings = async (req, res) => {
  const { heroImage, titlePrefix, titleHighlight, subtitle } = req.body;
  if (heroImage) mockHeroSettings.heroImage = heroImage;
  if (titlePrefix) mockHeroSettings.titlePrefix = titlePrefix;
  if (titleHighlight) mockHeroSettings.titleHighlight = titleHighlight;
  if (subtitle) mockHeroSettings.subtitle = subtitle;
  res.json(mockHeroSettings);
};

module.exports = {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getHeroSettings,
  updateHeroSettings
};
