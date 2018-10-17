var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');

var obj = {};
obj.title='Update Appointment';
obj.moment = moment;

/* GET home page. */
router.get('/updateappointment/:uid', function(req, res, next) {  
console.log(req.params.uid);
  res.render('updateappointment', { title: obj.title,  moment:obj.moment  });
});

module.exports = router;
