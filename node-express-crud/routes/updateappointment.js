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
requireModule.router.get('/updateappointment/:uid', function(req, res, next) {	
	appointmentModel.getAppointmentInfo(dbConn,req.params.uid, function(err, rows) {
		//console.log('row data = ', rows);
		obj.applist=rows;
		res.render('updateappointment', {
			title: obj.title,
			applist:obj.applist ,
			moment:obj.moment  
		}); 	
	});	 
});

/* GET home page. */
requireModule.router.post('/updateappointment', function(req, res, next) {	  
	appointmentModel.updateAppointmentInfo(dbConn,req.body, function(err, rows) {
		//console.log('row data = ', req.body);
		if(rows){	
		//res.redirect('/updateappointment/'+req.body.id);		
		res.redirect('/viewappointment');		
		//res.send('Record Updated'); 	
		}
	});	 
});

module.exports = requireModule.router;