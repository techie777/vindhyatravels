const express = require('express');
const router = express.Router();
const {
  getPublicReviews,
  getAllReviewsAdmin,
  createReview,
  toggleApproveReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getPublicReviews)
  .post(createReview);

router.get('/admin', protect, getAllReviewsAdmin);
router.put('/:id/approve', protect, toggleApproveReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
