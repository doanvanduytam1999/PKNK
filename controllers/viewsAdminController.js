const catchAsync = require('../utils/catchAsync');
const UserAdminModel = require('../models/userAdminModel');
const ServiceModel = require('../models/serviceModel');
const { param } = require('../routes/viewsAdminRoute');
const { symlink } = require('fs');

exports.postService = catchAsync(async(req, res, next) => {
    const service = await ServiceModel.create({
        serviceName: "DỊCH VỤ GHÉP XƯƠNG",
        serviceItems: [
            {name: "Nâng Xoang Hở",
            unit: "",
            price: "7,000,000 VNĐ",
            guarantee: "3 năm"
            },
            {name: "Nâng Xoang Kín",
            unit: "",
            price: "6,000,000 VNĐ",
            guarantee: "2 năm"
            },
            {name: "Ghép Mô Liên Kết (Xương + Màng)",
            unit: "1 mô",
            price: "10,000,000 VNĐ",
            guarantee: "5 năm"
            }
        ]
    })

    res.send("oke!");
})

exports.getLogin = (req, res, next) => {
    res.status(200).render('admin/login',{
        pageTitle: 'Login',
        patch: '/login'
    })
};

exports.getEditService = catchAsync(async(req, res, next) => {
    const option = req.params.index;
    
    const service = await ServiceModel.find();
    res.status(200).render('admin/editService',{
        index: option,
        ServiceItem : service[option],
        Service: service,
        pageTitle: 'Edit Service',
        patch: '/edit-Service'
    })
});
exports.getDashboard = catchAsync(async(req, res, next) => {
    const service = await ServiceModel.find();
    res.status(200).render('admin/dashboard',{
        Service : service,
        pageTitle: 'Admin',
        patch: '/dashboard'
    })
});

exports.getAddService = catchAsync(async(req, res, next) => {
    const service = await ServiceModel.find();
    res.status(200).render('admin/addService',{
        Service : service,
        pageTitle: 'Add Service',
        patch: '/add-Service'
    })
});

exports.postEditService = catchAsync(async(req, res, next) => {

    console.log(req.body);
    console.log(typeof req.body.dichvu != 'undefined');
    const index = req.params.index;
    const temp = [];
    if(typeof req.body.dichvu != 'undefined'){
        if(Array.isArray(req.body.dichvu)){
            for(i = 0; i < req.body.dichvu.length; i++){
                temp.push({
                    name: req.body.dichvu[i],
                    unit: req.body.donvi[i],
                    price: req.body.gia[i],
                    guarantee: req.body.baohanh[i]
                })
            }
        }
        else{
            temp.push({
                name: req.body.dichvu,
                unit: req.body.donvi,
                price: req.body.gia,
                guarantee: req.body.baohanh
            })
        }
    }
    
    const editService = await ServiceModel.findByIdAndUpdate(req.body.id,{
        serviceName: req.body.servicename,
        serviceItems: temp,
    },
    {
        new: true,
        runValidators: true
    }
    );
    //req.flash('success', {msg: 'Edit Success'});
    res.redirect(`/admin/edit-Service/${index}`);
});

exports.postDeleteService = catchAsync(async(req, res, next) => {
    const id = req.params.id;
    const service = await ServiceModel.findByIdAndDelete(id);
    if(!service){
        console.log("khong tim thay service!");
    }
    res.redirect('/admin/dashboard');
});

exports.postAddService = catchAsync(async(req, res, next) => {
    console.log(req.body);
    const temp = [];
    if(typeof req.body.dichvu != 'undefined'){
        if(Array.isArray(req.body.dichvu)){
            for(i = 0; i < req.body.dichvu.length; i++){
                temp.push({
                    name: req.body.dichvu[i],
                    unit: req.body.donvi[i],
                    price: req.body.gia[i],
                    guarantee: req.body.baohanh[i]
                })
            }
        }
        else{
            temp.push({
                name: req.body.dichvu,
                unit: req.body.donvi,
                price: req.body.gia,
                guarantee: req.body.baohanh
            })
        }
    }
    
    const service = await ServiceModel.create({
        serviceName: req.body.servicename,
        serviceItems: temp,
    })
    res.redirect('/admin/dashboard');
});