const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userCustomerSchema = new mongoose.Schema({
    hovaten: String,
    username: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
      },
      password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
      },
      phone: String,
      passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!'
        }
      },
      appointment:[{
        service: String,
        city: String,
        district: String,
        agency: String,
        time: Date,
        note: String,
        status: String
      }],
      passwordChangedAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
});


//Encryption password for user
userCustomerSchema.pre('save', async function(next) {
    //Only run this function if password was actually modified
    if(!this.isModified('password')) return next();
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    //Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});


//User compare password and passwordConfirm
userCustomerSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
}
//User change passwordAfter login

userCustomerSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

const UserCustomerSchema = mongoose.model('UserCustomerSchema', userCustomerSchema);
module.exports = UserCustomerSchema;
