var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var multer  = require('multer');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var deleteappointmentRouter = require('./routes/deleteappointment');
var createappointmentRouter = require('./routes/createappointment');
var viewappointmentRouter = require('./routes/viewappointment');
var updateappointmentRouter = require('./routes/updateappointment');

var app = express();

app.use((req, res, next) => {	
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Custom-Header,Upgrade-Insecure-Requests,Accept, form-data");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// // parse application/json
 
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/', viewappointmentRouter);
app.use('/users', usersRouter);


app.use('/', deleteappointmentRouter);
app.use('/', createappointmentRouter);
app.use('/viewappointment', viewappointmentRouter);
app.use('/', updateappointmentRouter);

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
