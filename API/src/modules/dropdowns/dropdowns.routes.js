const express = require('express');
const { authRequired } = require('../../middleware/auth');
const {getStatusDropdown} = require('./dropdowns.controller');

const router = express.Router();






router.get('/getStatusDropdown', getStatusDropdown);

module.exports = router;
