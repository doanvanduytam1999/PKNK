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
router.get('/admin', viewsAdminController.getAdmin);
router.get('/add-Service', viewsAdminController.getAddService);
//router.post('edit-Service', viewsAdminController.postEditService);
module.exports = router;