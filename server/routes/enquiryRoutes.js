const express = require('express');
const router = express.Router();
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createEnquiry)
  .get(protect, getEnquiries);

router.route('/:id/status')
  .put(protect, updateEnquiryStatus);

router.route('/:id')
  .delete(protect, deleteEnquiry);

module.exports = router;
