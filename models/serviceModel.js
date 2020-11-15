const mongoose = require('mongoose');


const ServiceSchema = new mongoose.Schema(
    {
        serviceName: {
            type: String,
            required: [true, 'Please provide type service']
        },
        typeServices: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TypeService'
        }]
    }
);
const Service = mongoose.model('Service', ServiceSchema);
module.exports = Service;