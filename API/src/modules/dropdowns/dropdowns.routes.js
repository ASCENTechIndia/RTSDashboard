const express = require('express');
const { authRequired } = require('../../middleware/auth');
const { getServices,getStatusDropdown } = require('./dropdowns.controller');

const router = express.Router();

router.get('/services', getServices);







router.get('/getStatusDropdown', getStatusDropdown);

module.exports = router;
