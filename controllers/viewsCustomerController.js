const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const { patch } = require('../app');

exports.getHomePage = (req, res, next) => {
    res.status(200).render('khachhang/index', {
        pageTitle: 'HomePage',
        patch: '/'
    })
}