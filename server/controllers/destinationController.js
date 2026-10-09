const Destination = require('../models/Destination');
const { mockDestinations } = require('../store/mockData');

// Helper to seed/sync MongoDB if count is small
const syncMongoWithMock = async () => {
  try {
    const count = await Destination.countDocuments();
    if (count < 10) {
      console.log('🔄 Syncing MongoDB destinations with latest MP & India packages...');
      await Destination.deleteMany({});
      const formatted = mockDestinations.map(({ _id, ...rest }) => rest);
      await Destination.insertMany(formatted);
      console.log('✅ MongoDB destinations updated successfully.');
    }
  } catch (err) {
    console.error('Mongo sync error:', err.message);
  }
};

// Auto sync on boot if MongoDB is connected
syncMongoWithMock();

// @desc    Get all destinations with optional category filter
// @route   GET /api/destinations
const getDestinations = async (req, res) => {
  const { category, search } = req.query;

  if (req.dbMode === 'mock') {
    let list = [...mockDestinations];
    if (category && category !== 'All') {
      list = list.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.titleEn && item.titleEn.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q) ||
          (item.location && item.location.toLowerCase().includes(q))
      );
    }
    return res.json(list);
  }

  try {
    await syncMongoWithMock();

    let query = {};
    if (category && category !== 'All') {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { titleEn: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    const destinations = await Destination.find(query).sort({ createdAt: -1 });
    res.json(destinations);
  } catch (error) {
    console.error('Error in getDestinations:', error);
    // Fallback to mockDestinations if Mongo throws an error
    let list = [...mockDestinations];
    if (category && category !== 'All') {
      list = list.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }
    res.json(list);
  }
};

// @desc    Get single destination
// @route   GET /api/destinations/:id
const getDestinationById = async (req, res) => {
  if (req.dbMode === 'mock') {
    const item = mockDestinations.find((d) => d._id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Destination not found' });
    return res.json(item);
  }

  try {
    const destination = await Destination.findById(req.params.id);
    if (destination) {
      res.json(destination);
    } else {
      const item = mockDestinations.find((d) => d._id === req.params.id);
      if (item) return res.json(item);
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    const item = mockDestinations.find((d) => d._id === req.params.id);
    if (item) return res.json(item);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create destination (Admin)
// @route   POST /api/destinations
const createDestination = async (req, res) => {
  const { title, titleEn, category, image, price, duration, durationEn, location, description, descriptionEn, highlights, inclusions, featured } = req.body;

  if (req.dbMode === 'mock') {
    const newDest = {
      _id: 'dest_' + Date.now(),
      title,
      titleEn: titleEn || title,
      category,
      image: image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
      price: Number(price) || 0,
      duration,
      durationEn: durationEn || duration,
      location: location || '',
      rating: 4.9,
      reviewsCount: 1,
      description,
      descriptionEn: descriptionEn || description,
      highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split(',') : []),
      inclusions: Array.isArray(inclusions) ? inclusions : ['Hotel Stay', 'Guided Tours', 'Transport'],
      featured: Boolean(featured),
      createdAt: new Date().toISOString()
    };
    mockDestinations.unshift(newDest);
    return res.status(201).json(newDest);
  }

  try {
    const destination = new Destination({
      title,
      titleEn,
      category,
      image,
      price: Number(price) || 0,
      duration,
      durationEn,
      location,
      description,
      descriptionEn,
      highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split(',') : []),
      inclusions: Array.isArray(inclusions) ? inclusions : ['Hotel Stay', 'Guided Tours', 'Transport'],
      featured: Boolean(featured)
    });

    const createdDestination = await destination.save();
    res.status(201).json(createdDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update destination (Admin)
// @route   PUT /api/destinations/:id
const updateDestination = async (req, res) => {
  if (req.dbMode === 'mock') {
    const index = mockDestinations.findIndex((d) => d._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Destination not found' });

    mockDestinations[index] = {
      ...mockDestinations[index],
      ...req.body,
      highlights: req.body.highlights 
        ? (Array.isArray(req.body.highlights) ? req.body.highlights : req.body.highlights.split(','))
        : mockDestinations[index].highlights
    };
    return res.json(mockDestinations[index]);
  }

  try {
    const destination = await Destination.findById(req.params.id);
    if (destination) {
      destination.title = req.body.title || destination.title;
      destination.category = req.body.category || destination.category;
      destination.image = req.body.image || destination.image;
      destination.duration = req.body.duration || destination.duration;
      destination.location = req.body.location !== undefined ? req.body.location : destination.location;
      destination.description = req.body.description || destination.description;
      if (req.body.highlights) {
        destination.highlights = Array.isArray(req.body.highlights) ? req.body.highlights : req.body.highlights.split(',');
      }
      if (req.body.featured !== undefined) {
        destination.featured = Boolean(req.body.featured);
      }

      const updatedDestination = await destination.save();
      res.json(updatedDestination);
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete destination (Admin)
// @route   DELETE /api/destinations/:id
const deleteDestination = async (req, res) => {
  if (req.dbMode === 'mock') {
    const index = mockDestinations.findIndex((d) => d._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Destination not found' });

    mockDestinations.splice(index, 1);
    return res.json({ message: 'Destination removed' });
  }

  try {
    const destination = await Destination.findById(req.params.id);
    if (destination) {
      await destination.deleteOne();
      res.json({ message: 'Destination removed' });
    } else {
      res.status(404).json({ message: 'Destination not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
};
