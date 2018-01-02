const passport = require('passport');
const passportGoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser( (user, done) =>  {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  const user = await User.findById(userId);
  done(null, user);
});

passport.use(new passportGoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy:true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleID: profile.id});
    if(existingUser)  {
      return done(null, existingUser);
    }

    const user = await new User({   googleID: profile.id }).save();
    done(null,user);

}));
