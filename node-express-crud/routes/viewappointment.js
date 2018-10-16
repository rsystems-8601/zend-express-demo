var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'zf3mvc'
});

connection.connect()

connection.query('SELECT * FROM `user_booking`', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows)
})

connection.end();




/* GET home page. */
router.get('/', function(req, res, next) {
	



  res.render('viewappointment', { title: 'Express' });
});

module.exports = router;
