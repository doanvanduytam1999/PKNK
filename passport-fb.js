const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const mongoosefindorcreate = require('mongoose-findorcreate');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
  name: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongoosefindorcreate);

const User = new mongoose.model("User", userSchema);


passport.serializeUser(function (user, done) {

  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: "130433928941048",
  clientSecret: "149e3e146e58544fd15e8ffce861cc82",
  callbackURL: "https://pknk.herokuapp.com/auth/facebook/callback"
},
  function (accessToken, refreshToken, profile, done) {

    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      if(err){
        return done(err);
      }else{
        var neuUser = new User();
        neuUser.facebookId = profile.id;
        neuUser.email = profile.email;;
        neuUser.name = profile.displayName;

        return done(null, neuUser);
          
      
      }
    });
  }
));