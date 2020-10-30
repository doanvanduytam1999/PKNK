const express = require('express');
const viewsAdminController = require('../controllers/viewsAdminController');
const customer = require('../models/userCustomerModel');
const service = require('../models/serviceModel');
const admin = require('../models/userAdminModel');
const { check, body } = require('express-validator');
const { route } = require('../app');


const router = express.Router();

router.get('/', viewsAdminController.getLogin);
router.get('/edit-Service/:index', viewsAdminController.getEditService);
router.get('/dashboard', viewsAdminController.getDashboard);
router.get('/add-Service', viewsAdminController.getAddService);
router.post('/edit-Service/:index', viewsAdminController.postEditService);
router.post('/deleteService/:id', viewsAdminController.postDeleteService);
router.post('/add-Service', viewsAdminController.postAddService);

module.exports = router;