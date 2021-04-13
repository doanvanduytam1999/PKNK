const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done){

    done(null, user);
});
passport.deserializeUser(function(user, done){
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "656809008149-c90mt0ssfimuufa166sq1ahf7h4aj17u.apps.googleusercontent.com",
    clientSecret: "po9rhX7t-jV8nLyyvfrwIPWx",
    callbackURL: "https://pknk.herokuapp.com//google/callback/"
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);

  }
));
