var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  db.user.findOrCreate({
    where: { email: email },
    defaults: {
      username: username,
      password: password
    }
  }).spread(function(user, created) {
    if (created) {
      console.log("account created");
      console.log(user);
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      console.log("email already exist");
      req.flash('error', 'Email already exists');
      res.redirect('/auth/login');
    }
  }).catch(function(error) {
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});

module.exports = router;
