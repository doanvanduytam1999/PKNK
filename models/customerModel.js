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
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
        },
        address: {
            type: String,
            required: [true, 'A Customer must have a address']
        },
        birthOfDay: {
            type: String,
            required:[true, "You must have a birthday"]
        },
        gender: {
            type: String,
            required: [true, 'A Customer must have a Gender'],
        },
        appointmentSchedule: [{time: Date, agency: String}]
    }
);

const CustomerSchema = mongoose.model('CustomerSchema', customerSchema);
module.exports = CustomerSchema;