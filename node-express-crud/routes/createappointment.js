var requireModule = require('../helpers/view/requireModule');
var connectionModel = require('../helpers/db/connection');
var appointmentModel = require('../helpers/db/appointmentmodel');
var dbConn;
connectionModel.connection(function(err, conn) {
	dbConn= conn;
});

var obj = {};
obj.title='Book Appointment';
obj.moment = requireModule.moment;
obj.applist = false;

/* GET home page. */
requireModule.router.get('/createappointment', function(req, res, next) {	
	res.render('createappointment', {
			title: obj.title,			 
		}); 
});

/* GET home page. */
requireModule.router.post('/createappointment', function(req, res, next) {	  
	appointmentModel.createAppointment(dbConn,req.body, function(err, rows) {
		//console.log('row data = ', req.body);
		if(rows){	
		res.redirect('/viewappointment');		
		//res.send('Record Updated'); 	
		}
	});	 
});

module.exports = requireModule.router;
