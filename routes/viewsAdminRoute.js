const express = require('express');
const viewsAdminController = require('../controllers/viewsAdminController');
const customer = require('../models/customerModel');
const service = require('../models/serviceModel');
const admin = require('../models/userAdminModel');
const { check, body } = require('express-validator');


const router = express.Router();



module.exports = router;