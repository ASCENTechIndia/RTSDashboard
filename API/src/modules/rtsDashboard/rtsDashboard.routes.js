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
router.get('/deptWiseApplications', authRequired, getDeptWiseApplications);
router.get('/tatWisePending', authRequired, getTatWisePending);
router.get('/monthwiseApplicationTrend', authRequired, getMonthwiseApplicationTrend);

module.exports = router;
