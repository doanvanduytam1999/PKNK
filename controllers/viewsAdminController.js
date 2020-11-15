const catchAsync = require('../utils/catchAsync');
const UserAdminModel = require('../models/userAdminModel');
const TypeService = require('../models/typeServiceModel');
const Service = require('../models/serviceModel');
const { param } = require('../routes/viewsAdminRoute');
const { findOne } = require('../models/userAdminModel');

exports.postService = catchAsync(async (req, res, next) => {
    const service = await ServiceModel.create({
        serviceName: "DỊCH VỤ GHÉP XƯƠNG",
        serviceItems: [
            {
                name: "Nâng Xoang Hở",
                unit: "",
                price: "7,000,000 VNĐ",

                guarantee: "3 năm"
            },
            {
                name: "Nâng Xoang Kín",
                unit: "",
                price: "6,000,000 VNĐ",
                guarantee: "2 năm"
            },
            {
                name: "Ghép Mô Liên Kết (Xương + Màng)",
                unit: "1 mô",
                price: "10,000,000 VNĐ",
                guarantee: "5 năm"
            }
        ]
    })

    res.send("oke!");
})

exports.getLogin = (req, res, next) => {
    res.status(200).render('admin/login', {
        pageTitle: 'Login',
        patch: '/login'
    })
};

exports.getEditService = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const foundService = await Service.findById(id).populate('typeServices');
    console.log(foundService);
    const kq = await TypeService.findOne().populate('serviceID');
    console.log(kq);


    res.status(200).render('admin/editService', {
        id: id,
        FoundService: foundService,
        pageTitle: 'Edit Service',
        patch: '/edit-Service'
    })
});
exports.getService = catchAsync(async (req, res, next) => {
    const service = await Service.find();
    res.status(200).render('admin/service', {
        Service: service,
        pageTitle: 'Service',
        patch: '/service'
    })
});
exports.getDashboard = catchAsync(async (req, res, next) => {
    const service = await Service.find();
    res.status(200).render('admin/dashboard', {
        Service: service,
        pageTitle: 'Admin',
        patch: '/dashboard'
    })
});

exports.getAddService = catchAsync(async (req, res, next) => {
    res.status(200).render('admin/addService', {
        pageTitle: 'Add Service',
        patch: '/add-Service'
    })
});

exports.postEditService = catchAsync(async (req, res, next) => {


    console.log(req.body);
    console.log(typeof req.body.dichvu != 'undefined');
    const id = req.params.id;
    const temp = [];
    if (typeof req.body.themdichvu != 'undefined') {
        if (Array.isArray(req.body.themdichvu)) {
            for (i = 0; i < req.body.themdichvu.length; i++) {
                const themloai = await TypeService.create({
                    name: req.body.themdichvu[i],
                    unit: req.body.themdonvi[i],
                    price: req.body.themgia[i],
                    guarantee: req.body.thembaohanh[i]
                })
                temp.push(themloai.id);
            }
        }
        else {
            const themloai = await TypeService.create({
                name: req.body.themdichvu,
                unit: req.body.themdonvi,
                price: req.body.themgia,
                guarantee: req.body.thembaohanh
            })
            temp.push(themloai.id);
        }
    }

    if (typeof req.body.xoaid != 'undefined') {
        if (Array.isArray(req.body.xoaid)) {
            for (i = 0; i < req.body.xoaid.length; i++) {
                const xoaloai = await TypeService.findByIdAndUpdate(req.body.xoaid[i], {
                    serviceID: '999999999999999999999999'
                }, {
                    new: true,
                    runValidators: true
                })
            }
        }
        else {
            const xoaloai = await TypeService.findByIdAndUpdate(req.body.xoaid, {
                serviceID: '999999999999999999999999'
            }, {
                new: true,
                runValidators: true
            })
        }
    }

    if (typeof req.body.dichvu != 'undefined') {
        if (Array.isArray(req.body.id)) {
            for (i = 0; i < req.body.id.length; i++) {
                const sualoai = await TypeService.findByIdAndUpdate(req.body.id[i], {
                    name: req.body.dichvu[i],
                    unit: req.body.donvi[i],
                    price: req.body.gia[i],
                    guarantee: req.body.baohanh[i]
                }, {
                    new: true,
                    runValidators: true
                })
                temp.push(sualoai.id);
            }
        }
        else {
            const sualoai = await TypeService.findByIdAndUpdate(req.body.id, {
                name: req.body.dichvu,
                unit: req.body.donvi,
                price: req.body.gia,
                guarantee: req.body.baohanh
            }, {
                new: true,
                runValidators: true
            })
            temp.push(sualoai.id);
        }
    }


    const editService = await Service.findByIdAndUpdate(id, {
        serviceName: req.body.servicename,
        typeServices: temp,
    },
        {
            new: true,
            runValidators: true
        }
    );
    //req.flash('success', {msg: 'Edit Success'});
    res.redirect(`/admin/edit-Service/${id}`);
});

exports.postDeleteService = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const service = await ServiceModel.findByIdAndDelete(id);
    if (!service) {
        console.log("khong tim thay service!");
    }
    res.redirect('/admin/dashboard');
});

exports.postAddService = catchAsync(async (req, res, next) => {
    const service = await Service.create({
        serviceName: req.body.servicename
    })
    const temp = [];
    if (typeof req.body.dichvu != 'undefined') {
        if (Array.isArray(req.body.dichvu)) {
            for (i = 0; i < req.body.dichvu.length; i++) {
                const typeService = await TypeService.create({
                    name: req.body.dichvu[i],
                    unit: req.body.donvi[i],
                    price: req.body.gia[i],
                    guarantee: req.body.baohanh[i],
                    serviceID: service.id

                })
                temp.push(typeService.id);
            }
        }
        else {
            const typeService = await TypeService.create({
                name: req.body.dichvu,
                unit: req.body.donvi,
                price: req.body.gia,
                guarantee: req.body.baohanh,
                serviceID: service.id

            })
            temp.push(typeService.id);
        }
    }

    const updateService = await Service.findByIdAndUpdate(service.id, {
        typeServices: temp
    })
    res.redirect('/admin/dashboard');
});