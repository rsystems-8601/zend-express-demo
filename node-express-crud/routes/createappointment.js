var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');

var obj = {};
obj.title='Book Appointment';
obj.moment = moment;

/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('createappointment', { title: obj.title,  moment:obj.moment  });
});

module.exports = router;
