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

router.get('/all/:id', function(req, res) {
  db.entry.findById(req.params.id)
  .then(function(entry) {
    db.list.findAll({
      where: {
        // day: req.body.day,
        // activty: req.body.activity,
        entryId: entry.id.toString()
      }
    }).then(function(list) {
      // res.json({entry:entry, list:list})
      res.render('explore/read', {entry:entry,list: list})
    })
  })
})

module.exports = router;
