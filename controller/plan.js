var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
  db.entry.findAll().then(function(data) {
  res.render('plan/view', {data:data});
})
});

router.get('/add', isLoggedIn, function(req, res) {
  res.render('plan/create');
});

router.post('/', isLoggedIn, function(req, res) {
  db.entry.create({
      username: req.user.username,
      country: req.body.country,
      budget: req.body.budget
    }).then(function(data) {
  // res.json(created);
  res.render('plan/view', {data: data})
})
});


module.exports = router;
