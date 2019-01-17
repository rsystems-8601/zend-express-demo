function getAppointmentInfo(connection,id=0, cb){
	connection.query('SELECT * FROM `appointments` where is_deleted=0 and id='+id, function (err, rows, fields) {
	  if (err) 
		cb(err);
	
		//console.log('The solution isee:  '+id, rows)
		cb(null,rows);				
	})
}

function getAppointmentList(connection,limit=10, cb){		
	connection.query('SELECT * FROM `appointments` where is_deleted=0 order by id desc limit '+limit, function (err, rows, fields) {
	  if (err) 
		cb(err);
	
		//console.log('The solution isee:  '+id, rows)
		cb(null,rows);				
	})
}

function updateAppointmentInfo(connection,postParam, cb){	
	if(postParam){
		connection.query('UPDATE appointments SET `username` = "'+postParam.username+'", `reason` = "'+postParam.reason+'", `booking_date` = "'+postParam.booking_date+'" WHERE `id` ='+postParam.id, function (err, rows, fields) {
		  if (err) 
			cb(err);
				
			cb(null,rows.affectedRows);				
		})
	}
}

function deleteAppointmentInfo(connection,id, cb){
	if(id){
		connection.query('UPDATE appointments SET `is_deleted` =1 WHERE `id` ='+id, function (err, rows, fields) {
		  if (err) 
			cb(err);
				
			cb(null,rows.affectedRows);				
		})
	}
}

function createAppointment(connection,postParam, cb){
	if(postParam){
		connection.query('INSERT INTO `appointments` ( `username`, `reason`, `booking_date`,`end_time`) VALUES ("'+postParam.username+'","'+postParam.reason+'","'+postParam.booking_date+'","'+postParam.booking_date+'")', function (err, rows, fields) {
		  if (err) 
			cb(err);
			//	console.log(rows)
			cb(null,rows.affectedRows);				
		})
	}
}

function createUser(connection,postParam, cb){
	if(postParam){
		
		connection.query('INSERT INTO `appointments` ( `firstName`, `lastName`, `username`,`password`) VALUES ("'+postParam.firstName+'","'+postParam.lastName+'","'+postParam.username+'","'+postParam.password+'")', function (err, rows, fields) {
		  if (err) 
			cb(err);
				
			cb(null,rows);				
		})
	}
}

function createMood(connection,postParam, cb){
	if(postParam){
		
		connection.query(('UPDATE appointments SET mood_emoji ='+postParam.mood_emoji+', mood_entry = "'+postParam.mood_entry+'" WHERE id ='+postParam.mood_user_id), function (err, rows, fields) {
		  if (err) 
			cb(err);
				
			cb(null,rows);				
		})
	}
}

function signInUser(connection,postParam, cb){
	if(postParam){		
		connection.query("SELECT * FROM `appointments` WHERE `username`='"+postParam.username+"' and `password`='"+postParam.password+"' limit 1", function (err, rows, fields) {
		  if (err) 
			cb(err);
		
				//cb(null,rows)
				if(rows[0]){					
					cb(null,rows);	
				}else{
					cb(true);	
				}
		})
	}
}


//connection.end();

module.exports = {
	getAppointmentInfo,
	getAppointmentList,
	updateAppointmentInfo,
	deleteAppointmentInfo,
	createAppointment,
	signInUser,
	createUser,
	createMood
	};