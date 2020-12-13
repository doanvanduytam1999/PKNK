const express = require('express');
const viewsAdminController = require('../controllers/viewsAdminController');
const customer = require('../models/userCustomerModel');
const service = require('../models/serviceModel');
const admin = require('../models/userAdminModel');
const { check, body } = require('express-validator');
const { route } = require('../app');
const authController = require('../controllers/authController');


const router = express.Router();

router.get('/', viewsAdminController.getLogin);
router.get('/edit-Service/:id', viewsAdminController.getEditService);
router.get('/dashboard', viewsAdminController.getDashboard);
router.get('/add-Service', viewsAdminController.getAddService);
router.get('/service', viewsAdminController.getService);

//List admin
router.get('/list-admin/', viewsAdminController.getListadmin);
router.get('/edit-admin/:id', viewsAdminController.getEditAdmin);
router.get('/update-password', viewsAdminController.getUpdatePassword);
router.get('/add-admin',authController.isLoggedIn, viewsAdminController.getAddAdmin);

router.post('/edit-Service/:id', viewsAdminController.postEditService);
router.post('/deleteTypeService/:id', viewsAdminController.postDeleteTypeService);
router.post('/add-Service', viewsAdminController.postAddService);
router.post('/editAdmin/:id', authController.isLoggedIn, viewsAdminController.postEditUSerAdmin);
router.post('/changePasswordUserAdmin/:id', authController.isLoggedIn, viewsAdminController.postChangePassword);
router.post('/add-admin', authController.isLoggedIn, viewsAdminController.postAddUserAdmin);
module.exports = router;