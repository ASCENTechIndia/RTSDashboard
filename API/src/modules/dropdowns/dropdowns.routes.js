const express = require('express');
const { authRequired } = require('../../middleware/auth');
const { getServices } = require('./dropdowns.controller');

const router = express.Router();

router.get('/services', getServices);

module.exports = router;
