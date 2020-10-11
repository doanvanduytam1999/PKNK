const mongoose = require('mongoose');
const validator = require('validator');


const customerSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: [true, 'A Customer must have a username']
        },
        phoneNumber: {
            type: String,
            required: [true, 'A Customer must have a phone number']
        },
        email: {
            type: String,
            trim: true,
            required: [true, 'Please provide your email'],
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        address: {
            type: String,
        },
        birthOfDay: {
            type: String,
        },
        gender: {
            type: String,
        },
        appointmentSchedule: [
            {
                time: Date,
                agency: {
                    city: String,
                    district: String
                },
                service: String, 
                status: String
            }
        ]
    }
);

const CustomerSchema = mongoose.model('CustomerSchema', customerSchema);
module.exports = CustomerSchema;