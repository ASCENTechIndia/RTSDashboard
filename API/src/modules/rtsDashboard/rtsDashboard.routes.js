const express = require('express');
const { authRequired } = require('../../middleware/auth');
const {
  getCounts,
  getDeptWiseApplications,
  getTatWisePending,
  getMonthwiseApplicationTrend,
  getApplicationStatusSummary,
  getDetailedApplicationStatus,
  getTopServices,
  getServicewiseTopDelay
} = require('./rtsDashboard.controller');

const router = express.Router();

router.get('/counts', getCounts);
router.get('/deptWiseApplications', getDeptWiseApplications);
router.get('/tatWisePending', getTatWisePending);
router.get('/monthwiseApplicationTrend', getMonthwiseApplicationTrend);
router.get('/applicationStatusSummary', getApplicationStatusSummary);
router.get('/detailedApplicationStatus', getDetailedApplicationStatus);
router.get('/topServices', getTopServices);
router.get('/servicewiseTopDelay', getServicewiseTopDelay);

module.exports = router;
