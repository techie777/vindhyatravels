const express = require('express');
const router = express.Router();
const {
  getDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
} = require('../controllers/destinationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getDestinations)
  .post(protect, createDestination);

router.route('/:id')
  .get(getDestinationById)
  .put(protect, updateDestination)
  .delete(protect, deleteDestination);

module.exports = router;
