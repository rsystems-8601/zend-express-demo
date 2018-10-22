var mysql = require('mysql');

function connection(cb){	
	connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'group_health'
	});
	connection.connect();
	cb(null,connection);	
}

module.exports = {connection};