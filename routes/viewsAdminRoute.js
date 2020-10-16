const express = require('express');
const viewsAdminController = require('../controllers/viewsAdminController');
const customer = require('../models/customerModel');
const service = require('../models/serviceModel');
const admin = require('../models/userAdminModel');
const { check, body } = require('express-validator');
const { route } = require('../app');


const router = express.Router();

router.get('/', viewsAdminController.getLogin);
router.get('/edit-Service', viewsAdminController.getEditService);

module.exports = router;