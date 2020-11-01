const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const { patch } = require('../app');
const CustomerModel = require('../models/userCustomerModel');
const ServiceModel = require('../models/serviceModel');
const authController = require('./authController');



exports.getHomePage = (req, res, next) => {
    res.status(200).render('customer/index', {
        pageTitle: 'HomePage',
        patch: '/'
    })
};
exports.getSchedule = catchAsync(async (req, res, next) => {
    const service = await ServiceModel.find();
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    res.status(200).render('customer/schedule', {
        Service: service,
        KiemTralogin : kiemTralogin,
        pageTitle: 'Đặt lịch',
        patch: '/schedule'
    })
});
exports.getService = catchAsync(async (req, res, next) => {
    const service = await ServiceModel.find();
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    res.status(200).render('customer/service', {
        Service: service,
        KiemTralogin : kiemTralogin,
        pageTitle: 'Service',
        patch: '/service'
    })
});
exports.getServiceHome = catchAsync(async (req, res, next) => {
    const service = await ServiceModel.find();
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    
    res.status(200).render('customer/index', {
        Service: service,
        KiemTralogin : kiemTralogin,
        pageTitle: 'Service',
        patch: '/'
    })
});
exports.getServiceCustomer = catchAsync(async (req, res, next) => {
    const option = req.params.index;
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    const service = await ServiceModel.find();
    res.status(200).render('customer/services', {
        index: option,
        KiemTralogin: kiemTralogin,
        ServiceItem: service[option],
        Service: service,
        pageTitle: 'Service'

    })
});

exports.getThongTin = (req, res, next) => {

    res.status(200).render('customer/thongtin', {
        pageTitle: 'ThongTin',
        patch: '/thongtin'
    })
};
exports.getSignin = catchAsync(async (req, res, next) => {
    const service = await ServiceModel.find();
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    res.status(200).render('customer/sign-in_customer', {
        Service: service,
        KiemTralogin : kiemTralogin,
        pageTitle: 'Đăng kí',
        patch: '/sign-in'
    })
});
exports.getLogin = catchAsync(async (req, res, next) => {
    const service = await ServiceModel.find();
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    res.status(200).render('customer/login_customer', {
        Service: service,
        KiemTralogin : kiemTralogin,
        pageTitle: 'Đăng Nhập',
        patch: '/login'
    })
});

exports.postDatLich = catchAsync(async (req, res, next) => {
    const id = req.body.id;
    const userCustomer = await CustomerModel.findById(id);
    const temp = userCustomer.appointment;
    temp.push({
        service: req.body.service,
        city: req.body.city,
        district: req.body.district,
        agency: req.body.agency,
        time: req.body.time,
        note: req.body.note,
        status: "Đang chờ"
    })

    const customer = await CustomerModel.findByIdAndUpdate(id,{
        appointment: temp
    }
    ,{
        new: true,
        runValidators: true
    });
    res.redirect('/get-schedule');
});

exports.postAddCustomer = catchAsync(async (req, res, next) => {
    const customer = await CustomerModel.create({
        hovaten: req.body.hovaten,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        phone: req.body.phone,
        appointment:[],

    })
    res.status(200).redirect('/login');
})
