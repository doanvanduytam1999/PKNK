const mongoose = require('mongoose');
const validator = require('validator');

const serviceSchema = new  mongoose.Schema(
    {
        serviceName: String,
        serviceItems: [{
            name: String,
            unit: String,
            price: String,
            guarantee: String
        }]
    }
);

const ServiceSchema = mongoose.model('ServiceSchema', serviceSchema);
module.exports = ServiceSchema;