const express = require('express');
const viewsCustomerController = require('../controllers/viewsCustomerController');
const customer = require('../models/customerModel');
const { check, body } = require('express-validator');
const { route } = require('./viewsAdminRoute');


const router = express.Router();

router.get('/', viewsCustomerController.getHomePage);
router.post('/datlich', viewsCustomerController.postDatLich);
router.get('/thongtin', viewsCustomerController.getThongTin);


router.get('/price-list', viewsCustomerController.getPriceList);

module.exports = router;