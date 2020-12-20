const mongoose = require('mongoose');

//Chưa được sử dụng tới, phục vụ cho phát triển sau này
const thoiGianDaDatSchema = new  mongoose.Schema(
    {
        times: [Date]
    }
);

const ThoiGianDaDat = mongoose.model('ThoiGianDaDat', thoiGianDaDatSchema);
module.exports = ThoiGianDaDat;