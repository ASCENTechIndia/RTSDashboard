const express = require('express');
const { authRequired } = require('../../middleware/auth');
const {
  getTopCounts,
  getApprovedCounts,
  getPendingCounts,
} = require('./topcounts.controller');

const router = express.Router();

router.get('/totalApplications', getTopCounts);
router.get('/approvedApplications', getApprovedCounts);
router.get('/pendingApplications', getPendingCounts);

module.exports = router;
