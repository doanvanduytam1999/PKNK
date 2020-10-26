const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const { patch } = require('../app');
const CustomerModel = require('../models/customerModel');
const ServiceModel = require('../models/serviceModel');



exports.getHomePage = (req, res, next) => {
    res.status(200).render('customer/index', {
        pageTitle: 'HomePage',
        patch: '/'
    })
};
exports.getSchedule =catchAsync(async(req, res, next) => {
    const service = await ServiceModel.find();
    res.status(200).render('customer/schedule', {
        Service : service,
        pageTitle: 'Đặt lịch',
        patch: '/schedule'
    })
});
exports.getService = catchAsync(async(req, res, next) => {
    const service = await ServiceModel.find();
    
    res.status(200).render('customer/service', {
        Service : service,
        pageTitle: 'Service',
        patch: '/service'
    })
});
exports.getServiceHome = catchAsync(async(req, res, next) => {
    const service = await ServiceModel.find();
    console.log(service);
    res.status(200).render('customer/index', {
        Service : service,
        pageTitle: 'Service',
        patch: '/'
    })
});
exports.getServiceCustomer = catchAsync(async(req, res, next) => {
    const option = req.params.index;
    
    const service = await ServiceModel.find();
    res.status(200).render('customer/services',{
        index: option,
        ServiceItem : service[option],
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


exports.postDatLich = catchAsync(async(req, res, next) => {
    
    const result = await CustomerModel.find({phoneNumber: req.body.phoneNumber});

    if(result.length == 0)
    { 
        const customer = await CustomerModel.create({
            username: req.body.username,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            address: "",
            birthOfDay: "",
            gender: "",
            appointmentSchedule: [{
                time: req.body.time,
                agency: {
                    city: req.body.city,
                    district: req.body.district
                },
                service: req.body.service,
                status: "Đang chờ"
            }]
            
        })
    }
    else
    {   console.log(req.body);
        const temp = {
            time: req.body.time,
            agency: {
                city: req.body.city,
                district: req.body.district
            },
            service: req.body.service,
            status: "Đang chờ"
        }
        
        const customer = await CustomerModel.findByIdAndUpdate(
            { _id: result[0].id},
            {$push: {appointmentSchedule : temp }}
        
        );
    }  
   res.redirect('/');
});