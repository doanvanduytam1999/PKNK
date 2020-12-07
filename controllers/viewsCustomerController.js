const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const { patch } = require('../app');
const CustomerModel = require('../models/userCustomerModel');
const ServiceModel = require('../models/serviceModel');
const authController = require('./authController');
const TypeService = require('../models/typeServiceModel');
const CityModel = require('../models/cityModel');
const DistrictModel = require('../models/districtModel');
const AgencyModel = require('../models/agencyModel');
const LichDat = require('../models/lichdatmodel');
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
    console.log(req.session.view);
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
    if(!req.session.view){
        req.session.view = ["abc"];
    }
    else{
        req.session.view.push("a");
    }
    res.status(200).render('customer/index', {
        TypeService: typeService,
        view: req.session.view,
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
    const typeService = await TypeService.find();
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    res.status(200).render('customer/sign-in_customer', {
        TypeService: typeService,
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
    const lichdat = await LichDat.create({
        time: req.body.time,
        serviceID: req.body.id_service,
        cityID: req.body.id_city,
        districtID: req.body.id_district,
        agencyID: req.body.id_agency,
        cunstomerID: req.body.id,
        note: req.body.note,
        status: "Đang chờ"
    })
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
exports.getProfile = catchAsync(async (req, res, next) => {
    //const service = await ServiceModel.find();
    const typeservice = await TypeService.find();
    const kiemTralogin = await authController.isLoggedIn2(req.cookies.jwt);
    ///const city = await CityModel.find();
    //console.log(city);
    res.status(200).render('customer/profile', {
        //Service: service,
        TypeService: typeservice,
        KiemTralogin: kiemTralogin,
        //City: city,
        pageTitle: 'Thông tin cá nhân',
        patch: '/profile'
    })
});