const express = require('express');
const { authRequired } = require('../../middleware/auth');
const {
  getCounts,
  getDeptWiseApplications,
  getTatWisePending,
  getMonthwiseApplicationTrend
} = require('./rtsDashboard.controller');

const router = express.Router();

router.get('/counts', getCounts);
router.get('/deptWiseApplications', getDeptWiseApplications);
router.get('/tatWisePending', getTatWisePending);
router.get('/monthwiseApplicationTrend', getMonthwiseApplicationTrend);

module.exports = router;
