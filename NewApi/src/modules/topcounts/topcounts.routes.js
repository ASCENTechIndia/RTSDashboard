const express = require('express');
const { authRequired } = require('../../middleware/auth');
const { getTopCounts } = require('./topcounts.controller');

const router = express.Router();

router.get('/totalApplications', getTopCounts);

module.exports = router;
