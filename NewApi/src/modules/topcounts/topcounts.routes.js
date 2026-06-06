const express = require('express');
const { authRequired } = require('../../middleware/auth');
const {
  getTopCounts,
  getApprovedCounts,
  getPendingCounts,
  getDelayedCounts,
} = require('./topcounts.controller');

const router = express.Router();

router.get('/totalApplications', getTopCounts);
router.get('/approvedApplications', getApprovedCounts);
router.get('/pendingApplications', getPendingCounts);
router.get('/delayedApplications', getDelayedCounts);

module.exports = router;
