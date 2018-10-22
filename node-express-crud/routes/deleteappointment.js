var requireModule = require('../helpers/view/requireModule');
var connectionModel = require('../helpers/db/connection');
var appointmentModel = require('../helpers/db/appointmentmodel');
var dbConn;
connectionModel.connection(function(err, conn) {
	dbConn= conn;
});

var obj = {};
obj.title='Update List';
obj.moment = requireModule.moment;
obj.applist = false;

/* GET home page. */
requireModule.router.get('/deleteappointment/:uid', function(req, res, next) {	
	appointmentModel.deleteAppointmentInfo(dbConn,req.params.uid, function(err, rows) {
		//console.log('row data = ', rows);
		if(rows){	
		res.redirect('/viewappointment');		
		//res.send('Record Updated'); 	
		} 	
	});	 
});

module.exports = requireModule.router;