const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// take user model
// put identifier into cookie
passport.serializeUser((user, done) => {
  done(null, user.id); // mongodb id
});

// pull out identifier from cookie
// to derive user
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    }).catch(err => console.log(err));
})

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        // user exists
        done(null, existingUser);
      } else {
        // create new user
        new User({ googleId: profile.id }).save()
          .then((user) => done(null, user))
          .catch(err => console.log(err))
      }
    }).catch(err => console.log(err));
})
);