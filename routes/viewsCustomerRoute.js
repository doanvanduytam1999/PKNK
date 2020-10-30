const express = require('express');
const viewsCustomerController = require('../controllers/viewsCustomerController');
const customer = require('../models/userCustomerModel');
const { check, body } = require('express-validator');
const { route } = require('./viewsAdminRoute');


const router = express.Router();

router.get('/', viewsCustomerController.getServiceHome);
router.get('/get-schedule', viewsCustomerController.getSchedule);
router.get('/get-schedule', viewsCustomerController.getServiceHome);
router.get('/login', viewsCustomerController.getLogin);
router.get('/sign-in', viewsCustomerController.getSignin);
router.post('/datlich', viewsCustomerController.postDatLich);
router.get('/thongtin', viewsCustomerController.getThongTin);
router.get('/service', viewsCustomerController.getService);
router.get('/get-services/:index', viewsCustomerController.getServiceCustomer);
//router.get('/price-list', viewsCustomerController.getPriceList);
module.exports = router;