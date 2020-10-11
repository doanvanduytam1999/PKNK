const express = require('express');
const viewsCustomerController = require('../controllers/viewsCustomerController');
const customer = require('../models/customerModel');
const { check, body } = require('express-validator');


const router = express.Router();

router.get('/', viewsCustomerController.getHomePage);
//router.post('/datlich', viewsCustomerController.postDatLich);

module.exports = router;