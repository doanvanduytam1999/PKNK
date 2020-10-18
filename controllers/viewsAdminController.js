const catchAsync = require('../utils/catchAsync');
const UserAdminModel = require('../models/userAdminModel');
const ServiceModel = require('../models/serviceModel');

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
        ServiceItem : service[option],
        Service: service,
        pageTitle: 'editService',
        patch: '/dichvu'
    })
});
exports.getAdmin = catchAsync(async(req, res, next) => {
    const service = await ServiceModel.find();
    res.status(200).render('admin/admin',{
        Service : service,
        pageTitle: 'Admin',
        patch: '/admin'
    })
});

exports.getAddService = catchAsync(async(req, res, next) => {
    const service = await ServiceModel.find();
    res.status(200).render('admin/addService',{
        Service : service,
        pageTitle: 'AddService',
        patch: '/addService'
    })
});