var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'group_health'
});

connection.connect();

var obj = {};
obj.title='Appointment List';
obj.moment = moment;

connection.query('SELECT * FROM `appointments`', function (err, rows, fields) {
  if (err) throw err
	
	obj.applist= rows;
	//console.log('The solution isee: ', rows)
})

connection.end();




/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('viewappointment', { title: obj.title, applist:obj.applist , moment:obj.moment  });
  
});

module.exports = router;
