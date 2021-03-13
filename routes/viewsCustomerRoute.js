const express = require('express');
const viewsCustomerController = require('../controllers/viewsCustomerController');
const authController = require('../controllers/authController');
const customer = require('../models/userCustomerModel');
const { post } = require('./viewsAdminRoute');
const passport = require('passport');




const router = express.Router();

router.get('/', viewsCustomerController.getServiceHome);
router.get('/get-schedule', authController.isLoggedIn,  viewsCustomerController.getSchedule);
router.get('/login', viewsCustomerController.getLogin);
router.get('/sign-in', viewsCustomerController.getSignin);
router.get('/thongtin', viewsCustomerController.getThongTin);
router.get('/service', viewsCustomerController.getTypeService);
router.get('/get-services/:index', viewsCustomerController.getServiceCustomer);
router.get('/profile', authController.isLoggedIn,viewsCustomerController.getProfile)
router.get('/DSLichDat', viewsCustomerController.getLichDatTheoQuan);
router.get('/detailschedule_customer/:id', authController.isLoggedIn,  viewsCustomerController.getDetailSchedule);
router.get('/view-listschedule', authController.isLoggedIn,  viewsCustomerController.getViewSchedule);
router.get('/get-student', viewsCustomerController.getStudent);

//demo API
router.get('/google', passport.authenticate('google',{scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google',{failureRedirect: '/login', successRedirect: '/'}));

router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email' }));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


router.post('/datlich', authController.isLoggedIn, viewsCustomerController.postDatLich);
router.post('/sign-up', viewsCustomerController.postAddCustomer);
router.post('/editUser', authController.isLoggedIn, viewsCustomerController.postEditUser);
router.post('/updatePassword', authController.isLoggedIn, viewsCustomerController.postUpdatePassword);

//router.get('/price-list', viewsCustomerController.getPriceList);
module.exports = router;