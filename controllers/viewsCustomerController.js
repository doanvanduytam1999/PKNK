const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const { patch } = require('../app');
const CustomerModel = require('../models/customerModel');

exports.getHomePage = (req, res, next) => {
    res.status(200).render('khachhang/index', {
        pageTitle: 'HomePage',
        patch: '/'
    })
};

exports.postDatLich = catchAsync(async(req, res, next) => {
    const cu = req.body;
    console.log(cu);
    const result = await CustomerModel.find({phoneNumber: req.body.phoneNumber});
    if(!result)
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
    {   
        result.appointmentSchedule =  [{
            time: req.body.time,
            agency: {
                city: req.body.city,
                district: req.body.district
            },
            service: req.body.service,
            status: "Đang chờ"
        }]
        const customer = await CustomerModel.findByIdAndUpdate(result.id,{
            result
        },
        {
            new: true,
            runValidators: true
        })
    } 
   res.redirect('/');
});