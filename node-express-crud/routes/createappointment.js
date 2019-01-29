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


/* GET home page. */
requireModule.router.post('/createappointment/api', function(req, res, next) {	  
	appointmentModel.createAppointmentAPI(dbConn,req.body, function(err, rows) {
		//console.log('row data = ', req.body);		 
		if(rows){				
			res.send({'status':true,'result':rows}); 	
		}else{
			res.send({'status':false,'result':rows}); 	
		}
	});	 
});

/* api createUser. */
requireModule.router.post('/createUser/api', function(req, res, next) {	  	
	//res.send(req.body); 	
	appointmentModel.createUser(dbConn,req.body, function(err, rows) {
		//console.log('row data = ', req.body);
		if(rows){
			res.send(rows); 	
		}
	});	 
});

/* api createMood. */
requireModule.router.post('/createMood/api', function(req, res, next) {	  	
	//res.send(req.body); 	
	appointmentModel.createMood(dbConn,req.body, function(err, rows) {
		//console.log('row data = ', req.body);
		if(rows){
			res.send(rows); 	
		}
	});	 
});

/* api createUser. */
requireModule.router.post('/signInUser/api', function(req, res, next) {	  	
	//res.send(req.body); 	
	appointmentModel.signInUser(dbConn,req.body, function(err, rows) {
		if(err){				
			res.send({error:true,result:'Record not found'});
		}else{
			res.send({error:false,result:rows});
		}
	});	 
});

module.exports = requireModule.router;
