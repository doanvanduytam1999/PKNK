const mongoose = require('mongoose');


const serviceSchema = new mongoose.Schema(
    {
        serviceName: {
            type: String,
            required: [true, 'Please provide type service']
        },
        serviceItems: [{
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
                
            }
            //này là service của data
        }]
    }
);

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;