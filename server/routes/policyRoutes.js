const express = require('express');
const router = express.Router();
const { getPolicies, updatePolicies } = require('../controllers/policyController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getPolicies)
  .put(protect, updatePolicies);

module.exports = router;
