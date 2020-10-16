const catchAsync = require('../utils/catchAsync');
const { validationResult } = require('express-validator');
const { patch } = require('../app');
const CustomerModel = require('../models/customerModel');
const { isEmptyObject } = require('jquery');

exports.getHomePage = (req, res, next) => {
    res.status(200).render('admin/admin', {
        pageTitle: 'HomePage',
        patch: '/'
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