const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosefindorcreate = require('mongoose-findorcreate');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password : String,
    googleId: String,
    facebookId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongoosefindorcreate);

const User = new mongoose.model("User", userSchema);

passport.use(new FacebookStrategy({
    clientID: "130433928941048",
    clientSecret: "149e3e146e58544fd15e8ffce861cc82",
    callbackURL: "http://localhost:4000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));