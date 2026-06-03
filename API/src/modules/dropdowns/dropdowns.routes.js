const express = require('express');
const { authRequired } = require('../../middleware/auth');
const { getServices, getStatusDropdown, getWards, getUsers } = require('./dropdowns.controller');

const router = express.Router();

router.get('/services', getServices);
router.get('/wards', getWards);
router.get('/users', getUsers);
router.get('/getStatusDropdown', getStatusDropdown);

module.exports = router;
