const catchAsync = require('../utils/catchAsync');
const UserAdminModel = require('../models/userAdminModel');
const Service = require('../models/serviceModel');
const TypeService = require('../models/typeServiceModel');
const { param } = require('../routes/viewsAdminRoute');
const { findOne, getMaxListeners } = require('../models/userAdminModel');
const CityModel = require('../models/cityModel');
const DistrictModel = require('../models/districtModel');
const AgencyModel = require('../models/agencyModel');

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

exports.postAddCity = catchAsync(async (req, res, next) => {
    const district = await DistrictModel.create({
        districtName: "Quận 1",
        cityID: "5fc67e97c1dae73e50f12f70"
    });
    const diachi = await AgencyModel.create({
        address: "108 Lê Văn Lương, phường C, quận 1, TP.HCM",
        districtID: district.id
    });
    const diachi2 = await AgencyModel.create({
        address: "99 Lâm Văn Bền, phường B, quận 1, TP.HCM",
        districtID: district.id
    });
    const diachi3 = await AgencyModel.create({
        address: "99 Nguyễn Trãi, phường A, quận 1, TP.HCM",
        districtID: district.id
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
    const foundTypeService = await TypeService.findById(id).populate('services');
    res.status(200).render('admin/editService', {
        id: id,
        FoundService: foundTypeService,
        pageTitle: 'Edit Service',
        patch: '/edit-Service'
    })
});
exports.getService = catchAsync(async (req, res, next) => {
    const typeService = await TypeService.find();
    res.status(200).render('admin/service', {
        Service: typeService,
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
    const id = req.params.id;
    if (typeof req.body.themdichvu != 'undefined') {
        if (Array.isArray(req.body.themdichvu)) {
            for (i = 0; i < req.body.themdichvu.length; i++) {
                const themDV = await Service.create({
                    name: req.body.themdichvu[i],
                    unit: req.body.themdonvi[i],
                    price: req.body.themgia[i],
                    guarantee: req.body.thembaohanh[i],
                    typeServiceID: id
                })
            }
        }
        else {
            const themDV = await Service.create({
                name: req.body.themdichvu,
                unit: req.body.themdonvi,
                price: req.body.themgia,
                guarantee: req.body.thembaohanh,
                typeServiceID: id
            })
        }
    }

    if (typeof req.body.xoaid != 'undefined') {
        if (Array.isArray(req.body.xoaid)) {
            for (i = 0; i < req.body.xoaid.length; i++) {
                const xoaDV = await Service.findByIdAndDelete(req.body.xoaid[i]);
            }
        }
        else {
            const xoaDV = await Service.findByIdAndDelete(req.body.xoaid);
        }
    }

    if (typeof req.body.dichvu != 'undefined') {
        if (Array.isArray(req.body.id)) {
            for (i = 0; i < req.body.id.length; i++) {
                const suaDV = await Service.findByIdAndUpdate(req.body.id[i], {
                    name: req.body.dichvu[i],
                    unit: req.body.donvi[i],
                    price: req.body.gia[i],
                    guarantee: req.body.baohanh[i]
                }, {
                    new: true,
                    runValidators: true
                })
            }
        }
        else {
            const suaDV = await Service.findByIdAndUpdate(req.body.id, {
                name: req.body.dichvu,
                unit: req.body.donvi,
                price: req.body.gia,
                guarantee: req.body.baohanh
            }, {
                new: true,
                runValidators: true
            })
        }

        const suaLoaiDV = await TypeService.findByIdAndUpdate(id, {
            typeServiceName: req.body.typeServicename
        })
    }
    res.redirect(`/admin/edit-Service/${id}`);
});

exports.postDeleteTypeService = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const typeService = await TypeService.findByIdAndDelete(id);
    if (!typeService) {
        console.log("khong tim thay service!");
    }
    res.redirect('/admin/dashboard');
});

exports.postAddService = catchAsync(async (req, res, next) => {
    const typeService = await TypeService.create({
        typeServiceName: req.body.servicename
    });

    if (typeof req.body.dichvu != 'undefined') {
        if (Array.isArray(req.body.dichvu)) {
            for (i = 0; i < req.body.dichvu.length; i++) {
                const service = await Service.create({
                    name: req.body.dichvu[i],
                    unit: req.body.donvi[i],
                    price: req.body.gia[i],
                    guarantee: req.body.baohanh[i],
                    typeServiceID: typeService.id
                })
            }
        }
        else {
            const service = await Service.create({
                name: req.body.dichvu,
                unit: req.body.donvi,
                price: req.body.gia,
                guarantee: req.body.baohanh,
                typeServiceID: typeService.id

            })
        }
    }
    res.redirect('/admin/dashboard');
});
//List admin
exports.getListadmin = catchAsync(async(req, res, next) => {
    const userAdmins = await UserAdminModel.find();
    res.status(200).render('admin/listadmin', {
        UserAdmins: userAdmins,
        pageTitle: 'List Admin',
        patch: '/listadmin'
    });
});
exports.getEditAdmin = catchAsync(async(req, res, next) => {
    console.log(req.params.id);
    const user = await UserAdminModel.findById(req.params.id);
    console.log(user);
    res.status(200).render('admin/editadmin', {
        User : user,
        pageTitle: 'Edit Admin',
        patch: '/editadmin'
    });
});
exports.getUpdatePassword = (req, res, next) => {
    res.status(200).render('admin/updatepasswordadmin', {
        pageTitle: 'Edit Password Admin',
        patch: '/updatepasswordadmin'
    });
};

exports.postAddUserAdmin = catchAsync(async (req, res, next) => {
    const userAdmin = await UserAdminModel.create({
        username: "duytam",
        email: "tam@gmail.com",
        role: "admin",
        password: "tam123456",
        passwordConfirm: "tam123456",
    })
    res.send(userAdmin);
});

