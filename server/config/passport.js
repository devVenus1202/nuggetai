const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./main');

// Setting username field to email rather than username
const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return done(err, {
        error: 'Something is wrong. Please try again later.',
      });
    }
    if (!user) {
      return done(null, false, {
        error: 'auth-no-user',
      });
    }

    if (user.status && user.status !== 'active') {
      return done(null, false, {
        error: 'auth-noactive-user',
      });
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, {
          error: 'auth-no-user',
        });
      }

      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: config.secret,
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findOne({ email: payload.email }, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(localLogin);
passport.use(jwtLogin);
