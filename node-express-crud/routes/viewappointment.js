var requireModule = require('../helpers/view/requireModule');
var connectionModel = require('../helpers/db/connection');
var appointmentModel = require('../helpers/db/appointmentmodel');
var dbConn;
connectionModel.connection(function(err, conn) {
	dbConn= conn;
});

var obj = {};
obj.title='Appointment List';
obj.moment = requireModule.moment;
obj.applist = false;

/* GET home page. */
requireModule.router.get('/', function(req, res, next) {	
	appointmentModel.getAppointmentList(dbConn,10, function(err, rows) {
		//console.log('row data = ', rows);
		obj.applist=rows;
		res.render('viewappointment', { 
			title: obj.title, 
			applist:obj.applist, 
			moment:obj.moment  
		}); 	
	});	 
});

/* API GET home page. */
requireModule.router.get('/api', function(req, res, next) {	
	appointmentModel.getAppointmentList(dbConn,10, function(err, rows) {
		//console.log('row data = ', rows);
		obj.applist=rows;
		res.send({'status' :true,
		'result' : obj.applist});
		// res.render('viewappointment', { 
			// title: obj.title, 
			// applist:obj.applist, 
			// moment:obj.moment  
		// }); 	
	});	 
});

module.exports = requireModule.router;
