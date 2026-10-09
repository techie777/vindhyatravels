const Enquiry = require('../models/Enquiry');

const { mockEnquiries } = require('../store/mockData');

// @desc    Submit a new enquiry
// @route   POST /api/enquiries
const createEnquiry = async (req, res) => {
  const { name, email, phone, destination, travelDate, travelersCount, travelStyle, estimatedCost, specialRequests } = req.body;

  const finalName = name || 'Customer Lead';
  const finalPhone = phone || '';
  const finalDest = destination || 'General Enquiry';
  const finalEmail = email || 'quicklead@vindhyanchal.com';
  const finalDate = travelDate || 'As Soon As Possible';

  if (!finalName || !finalPhone || !finalDest) {
    return res.status(400).json({ message: 'Please fill in Name, Phone, and Destination' });
  }

  if (req.dbMode === 'mock') {
    const newEnquiry = {
      _id: 'enq_' + Date.now(),
      name: finalName,
      email: finalEmail,
      phone: finalPhone,
      destination: finalDest,
      travelDate: finalDate,
      travelersCount: Number(travelersCount) || 2,
      travelStyle: travelStyle || 'Standard',
      estimatedCost: Number(estimatedCost) || 0,
      specialRequests: specialRequests || '',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    mockEnquiries.unshift(newEnquiry);
    return res.status(201).json({ message: 'Enquiry submitted successfully!', enquiry: newEnquiry });
  }

  try {
    const enquiry = new Enquiry({
      name: finalName,
      email: finalEmail,
      phone: finalPhone,
      destination: finalDest,
      travelDate: finalDate,
      travelersCount: Number(travelersCount) || 2,
      travelStyle: travelStyle || 'Standard',
      estimatedCost: Number(estimatedCost) || 0,
      specialRequests: specialRequests || '',
      status: 'Pending'
    });

    const createdEnquiry = await enquiry.save();
    res.status(201).json({ message: 'Enquiry submitted successfully!', enquiry: createdEnquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all enquiries (Admin)
// @route   GET /api/enquiries
const getEnquiries = async (req, res) => {
  if (req.dbMode === 'mock') {
    return res.json(mockEnquiries);
  }

  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update enquiry status (Admin)
// @route   PUT /api/enquiries/:id/status
const updateEnquiryStatus = async (req, res) => {
  const { status } = req.body;

  if (!['Pending', 'Contacted', 'Confirmed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  if (req.dbMode === 'mock') {
    const enquiry = mockEnquiries.find((e) => e._id === req.params.id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    enquiry.status = status;
    return res.json(enquiry);
  }

  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (enquiry) {
      enquiry.status = status;
      const updatedEnquiry = await enquiry.save();
      res.json(updatedEnquiry);
    } else {
      res.status(404).json({ message: 'Enquiry not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete enquiry (Admin)
// @route   DELETE /api/enquiries/:id
const deleteEnquiry = async (req, res) => {
  if (req.dbMode === 'mock') {
    const index = mockEnquiries.findIndex((e) => e._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Enquiry not found' });
    mockEnquiries.splice(index, 1);
    return res.json({ message: 'Enquiry removed' });
  }

  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (enquiry) {
      await enquiry.deleteOne();
      res.json({ message: 'Enquiry removed' });
    } else {
      res.status(404).json({ message: 'Enquiry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
};
