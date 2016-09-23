var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

router.get('/itinerary', isLoggedIn, function(req, res) {
  db.entry.findAll({
    where : {
      username: req.user.username
    }
  }
  ).then(function(data) {
  res.render('plan/view', {data:data});
})
});


router.get('/itinerary/edit/:id',  function(req, res) {
  db.entry.findById(req.params.id).then(function(data) {
    // res.json(data)
    res.render('plan/edit', {data:data})
  })
})

router.post('/itinerary/edit/:id', function(req, res) {
  console.log(">>>>>>>>>>>>>", req.params.id);
  db.entry.findById(req.params.id)
  .then(function(entry) {
    db.list.update({
      where: {
        // day: req.body.day,
        // activty: req.body.activity,
        entryId: entry.id.toString()
      }
    }).then(function(list) {
      // res.json({entry:entry, list:list})
      res.redirect('plan/itinerary', {entry:entry,list: list})
    })
  })
});


router.post('/itinerary/delete/:id', function(req, res) {

   db.entry.destroy({
     where: {id: req.params.id}
    }).then(function(data) {
         res.redirect('/plan/itinerary')
       })
});


router.get('/itinerary/create', function(req, res) {
  // db.entry.findById(req.params.id).then(function(data) {
    res.render('plan/create')
  // })
});


router.post('/itinerary/create', function(req, res) {
  db.entry.create({
      username: req.user.username,
      country: req.body.country,
      budget: req.body.budget
    }).then(function(data) {
  // res.json(created);
  res.render('plan/day', {data:data})
})
});


router.get('/itinerary/create/:id/list', function(req, res) {
  db.entry.findById(req.params.id).then(function(data) {
  res.render('plan/day', {data:data})
})
});

router.post('/itinerary/create/:id/list', function(req, res) {
  // var some = req.params.id
  db.entry.findById(req.params.id).then(function (foundEntry) {

  foundEntry.createList({
      day: req.body.day,
      activity: req.body.activity

    }).then(function (post) {
     res.redirect('/plan/itinerary');
   });
  })
});

router.get('/itinerary/:id', function(req, res) {
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
      res.render('plan/read', {entry:entry,list: list})
    })
  })
})


module.exports = router;
