const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const { patch } = require('../app');
const CustomerModel = require('../models/userCustomerModel');
const ServiceModel = require('../models/serviceModel');
const authController = require('./authController');
const TypeService = require('../models/typeServiceModel');
const District = require('../models/districtModel');
const CityModel = require('../models/cityModel');
const DistrictModel = require('../models/districtModel');
const AgencyModel = require('../models/agencyModel');

exports.getHomePage = (req, res, next) => {
    res.status(200).render('customer/index', {
        pageTitle: 'HomePage',
        patch: '/'
    })
};
exports.getSchedule = catchAsync(async (req, res, next) => {
    const service = await ServiceModel.find();
    const typeservice = await TypeService.find();
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    const city = await CityModel.find();
    console.log(city);
    res.status(200).render('customer/schedule', {
        Service: service,
        TypeService: typeservice,
        KiemTralogin: kiemTralogin,
        City: city,
        pageTitle: 'Đặt lịch',
        patch: '/schedule'
    })
});
exports.getTypeService = catchAsync(async (req, res, next) => {
    const typeService = await TypeService.find().populate('services');
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    res.status(200).render('customer/service', {
        TypeService: typeService,
        KiemTralogin : kiemTralogin,
        pageTitle: 'Service',
        patch: '/service'
    })
});
exports.getServiceHome = catchAsync(async (req, res, next) => {
    const typeService = await TypeService.find();
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);

    res.status(200).render('customer/index', {
        TypeService: typeService,
        KiemTralogin: kiemTralogin,
        pageTitle: 'Service',
        patch: '/'
    })
});
exports.getServiceCustomer = catchAsync(async (req, res, next) => {
    const option = req.params.index;
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    const typeservice = await TypeService.find();
    const motLoaiDv = await TypeService.findById(option).populate('services');
    res.status(200).render('customer/services', {
        index: option,
        KiemTralogin: kiemTralogin,
        ServiceItem: motLoaiDv.services,
        MotLoaiSV: motLoaiDv,
        TypeService: typeservice,
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
        KiemTralogin: kiemTralogin,
        pageTitle: 'Đăng kí',
        patch: '/sign-in'
    })
});
exports.getLogin = catchAsync(async (req, res, next) => {
    const typeService = await TypeService.find();
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    res.status(200).render('customer/login_customer', {
        TypeService: typeService,
        KiemTralogin: kiemTralogin,
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

    const customer = await CustomerModel.findByIdAndUpdate(id, {
        appointment: temp
    }
        , {
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


    })
    res.status(200).redirect('/login');
});

exports.getService = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const typeService = await TypeService.findById(id).populate('services');
    res.status(200).json({
        status: 'success',
        Services: typeService.services
    });
})

exports.getDistrict = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const city = await CityModel.findById(id).populate('districts');
    res.status(200).json({
        status: 'success',
        Districts: city.districts
        
    });
})

exports.getAgency = catchAsync(async (req, res, next) => {
    const id = req.params.id;
        const district = await DistrictModel.findById(id).populate('agencys');
    res.status(200).json({
        status: 'success',
        Agencys: district.agencys
    });
})
