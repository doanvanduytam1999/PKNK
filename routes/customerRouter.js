const express = require('express');
const CustomerController = require('../controllers/viewsCustomerController');
const authController = require('../controllers/authController');


const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);


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
