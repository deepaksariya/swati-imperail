var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var logger = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}));



/*
mongoose.connect('mongodb://localhost:27017/imperial', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Local MongoDB Database Connected'))
 .catch(err => console.log(err)) */

mongoose.connect('mongodb+srv://data123:data123@cluster0.exouw.mongodb.net/imperial_test?retryWrites=true&w=majority')
     .then(() => console.log('MongoDB Database Connected'))
     .catch(err => console.log(err)) 

 app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name, user-access-token, authorization'
  )
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    return res.status(200).json({})
  } else {
    next()
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
