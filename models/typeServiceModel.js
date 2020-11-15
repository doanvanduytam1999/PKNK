const mongoose = require('mongoose');
const { collection } = require('./userAdminModel');


const typeServiceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide service name']
        },
        unit: {
            type: String,
        },
        price: {
            type: String,
            required: [true, 'Please provide price']
        },
        guarantee: {
            type: String,
        },
        serviceID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
        }
    }, 
    
);


const TypeService = mongoose.model('TypeService', typeServiceSchema);

module.exports = TypeService;