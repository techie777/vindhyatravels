const Review = require('../models/Review');
const { mockReviews } = require('../store/mockData');

// @desc    Get approved reviews for public website
// @route   GET /api/reviews
const getPublicReviews = async (req, res) => {
  if (req.dbMode === 'mock') {
    return res.json(mockReviews.filter((r) => r.approved));
  }

  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all reviews for Admin Panel
// @route   GET /api/reviews/admin
const getAllReviewsAdmin = async (req, res) => {
  if (req.dbMode === 'mock') {
    return res.json(mockReviews);
  }

  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit a review (user)
// @route   POST /api/reviews
const createReview = async (req, res) => {
  const { author, rating, comment, location, avatar } = req.body;

  if (!author || !rating || !comment) {
    return res.status(400).json({ message: 'Name, Rating, and Review text are required' });
  }

  if (req.dbMode === 'mock') {
    const newReview = {
      _id: 'rev_' + Date.now(),
      author,
      rating: Number(rating),
      comment,
      location: location || 'Traveler',
      avatar: avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`,
      approved: false, // requires admin approval
      createdAt: new Date().toISOString()
    };
    mockReviews.unshift(newReview);
    return res.status(201).json({ message: 'Review submitted! It will appear once approved by admin.', review: newReview });
  }

  try {
    const review = new Review({
      author,
      rating: Number(rating),
      comment,
      location: location || 'Traveler',
      avatar: avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`,
      approved: false
    });

    const createdReview = await review.save();
    res.status(201).json({ message: 'Review submitted! It will appear once approved by admin.', review: createdReview });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Approve/Reject review (Admin)
// @route   PUT /api/reviews/:id/approve
const toggleApproveReview = async (req, res) => {
  const { approved } = req.body;

  if (req.dbMode === 'mock') {
    const rev = mockReviews.find((r) => r._id === req.params.id);
    if (!rev) return res.status(404).json({ message: 'Review not found' });
    rev.approved = approved !== undefined ? Boolean(approved) : !rev.approved;
    return res.json(rev);
  }

  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      review.approved = approved !== undefined ? Boolean(approved) : !review.approved;
      const updatedReview = await review.save();
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete review (Admin)
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
  if (req.dbMode === 'mock') {
    const index = mockReviews.findIndex((r) => r._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Review not found' });
    mockReviews.splice(index, 1);
    return res.json({ message: 'Review deleted' });
  }

  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      await review.deleteOne();
      res.json({ message: 'Review deleted' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPublicReviews,
  getAllReviewsAdmin,
  createReview,
  toggleApproveReview,
  deleteReview
};
