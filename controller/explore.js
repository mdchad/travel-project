var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/all', function(req, res) {
  db.entry.findAll(
    {
      order: 'id DESC'
    }
  ).then(function(data) {
  res.render('explore/all', {data:data});
})
});

module.exports = router;
