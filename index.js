var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var passport = require('./config/ppConfig');
var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var methodOverride = require('method-override');

var app = express();

app.use(express.static(__dirname + '/public/'));


app.set('view engine', 'ejs');
app.use(ejsLayouts);


app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended:false}));
app.use(session({
  secret: 'papadop',
  resave: false,
  saveUninitialized: true
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});


app.get('/home', isLoggedIn, function(req, res) {
  res.render('home');
});

app.use('/plan', require('./controller/plan'));

app.use('/explore', require('./controller/explore'));

app.use('/auth', require('./controller/auth'));


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
