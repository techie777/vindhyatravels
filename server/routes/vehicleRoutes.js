const express = require('express');
const router = express.Router();
const {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  getHeroSettings,
  updateHeroSettings
} = require('../controllers/vehicleController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getVehicles)
  .post(protect, createVehicle);

router.route('/hero/settings')
  .get(getHeroSettings)
  .put(protect, updateHeroSettings);

router.route('/:id')
  .put(protect, updateVehicle)
  .delete(protect, deleteVehicle);

module.exports = router;
