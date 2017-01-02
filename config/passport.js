var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var model_usu = require('../models/user.js');
// expose this function to our app using module.exports


passport.use(new LocalStrategy({
    usernameField: 'alias',
    passwordField: 'password'
  },
  function(username, password, done) {


      model_usu.findOne({ alias:username }, function (err, user) {
        if (err) { return done(err); }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'Usuario no encontrado'
          });
        }
        // Return if password is wrong
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: 'Contraseña incorrecta'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }));
