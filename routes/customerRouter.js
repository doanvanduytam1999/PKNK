const express = require('express');
const CustomerController = require('../controllers/viewsCustomerController');
const authController = require('../controllers/authController');


const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/getService', authController.isLoggedIn, CustomerController.getService);
router.get('/getDistrict', authController.isLoggedIn, CustomerController.getDistrict);
router.get('getAgency', authController.isLoggedIn, CustomerController.getAgency);

// router.param('id', tourController.checkID);

/* router.get('/studentStudy', CustomerController.getAllStudentStudy);
router.get('/studentBackHome', CustomerController.getAllStudentBackHome); */

/* router
  .route('/')
  .get(CustomerController.getAllStudents)
  .post(CustomerController.createStudent); */

/* router
  .route('/:id')
  .get(CustomerController.getStudent)
  .patch(CustomerController.updateStudent)
  .delete(CustomerController.deleteStudent); */

module.exports = router;
