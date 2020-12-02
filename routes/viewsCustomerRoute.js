const express = require('express');
const viewsCustomerController = require('../controllers/viewsCustomerController');
const authController = require('../controllers/authController');
const customer = require('../models/userCustomerModel');
const { check, body } = require('express-validator');


const router = express.Router();

router.get('/', viewsCustomerController.getServiceHome);
router.get('/get-schedule', authController.isLoggedIn,  viewsCustomerController.getSchedule);
//router.get('/get-schedule', viewsCustomerController.getServiceHome);
router.get('/login', viewsCustomerController.getLogin);
router.get('/sign-in', viewsCustomerController.getSignin);
router.get('/thongtin', viewsCustomerController.getThongTin);
router.get('/service', viewsCustomerController.getTypeService);
router.get('/get-services/:index', viewsCustomerController.getServiceCustomer);


router.post('/datlich', authController.isLoggedIn, viewsCustomerController.postDatLich);
router.post('/sign-up', viewsCustomerController.postAddCustomer);
//router.get('/price-list', viewsCustomerController.getPriceList);
module.exports = router;