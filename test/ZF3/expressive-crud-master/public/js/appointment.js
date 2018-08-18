$(function() {
	
		/**
		** API_URL: server API location
		*/
		
		API_URL = "http://10.131.40.109:8080/";
		
		/**
		** Function call: prepare() - 
		** Function call: get_appointments() - load all active appointments
		*/
		
		prepare();
		get_appointments();	

		/**
		** @event : book appointment
		** @request type : POST
		** @params : full name, reason, appointment time
		** @callback : get_appointments()
		*/
		
		$('#btn_submit').click(function()
		{
		    if($('#full_name').val() !=''  && $('#appointment_reason').val() !='' && $('#appointment_time').val() !='' )
			{			
				$.ajax({
					type: 'POST',
					data: $('#request_form').serialize(),
					url: API_URL+"createappointment",						
					success: function(result) 
					{
						if(result.status){
							alert('Appointment booked successfully.');								
							prepare();
							get_appointments();
						}							
					}
				});
			}else{
				alert('Please fill in all the fields. Required Time with date too.');
			}
		});	
		
		/**
		** @event : update appointment
		** @request type : POST
		** @params : full name, reason, appointment time
		** @callback : get_appointments()
		*/
		
		$('#btn_update').click(function()
		{
			if($('#full_name').val() !=''  && $('#appointment_reason').val() !='' && $('#appointment_time').val() !='' )
			{					
				$.ajax({
					type: 'POST',
					data: $('#request_form').serialize(),
					url: API_URL+"updateappointment",						
					success: function(result) 
					{
						if(result.status){															
							prepare();
							get_appointments();
							alert('Appointment updated successfully.');
						}							
					}
				});
			}else{
				alert('Please fill in all the fields. Required Time with date too.');
			}
		});	
	
});

/**
** reset the book appointment form
** @params : 
*/
		
function reset_form()
{
	$('#request_form')[0].reset();		
	$('.form_update').hide();
	$('.form_submit').show();		
}

/**
** display book appointment form. Hide other screens
** set focus on first input field
** @params : 
*/

function book_appointment() 
{		
	reset_form();		
	$("input:text:visible:first").focus();	
	$(".view_appointments").hide();
	$(".appointment_form").show();
}

/**
** reset book appointment form and hide it. Show appointments listing screen
** @params : 
*/

function prepare() 
{
	reset_form();
	$(".view_appointments").show();
	$(".appointment_form").hide();
}

/**
** reset book appointment form and hide it. Unhide appointments listing screen
** @params : 
*/

function get_appointments() 
{
	$.ajax({
			type: 'GET',
			url: API_URL+"viewappointment",
			success: function(result) 
			{
				var records = '';
				result = result.result;
				$.each( result, function( key, value ) {
				  record = JSON.parse(JSON.stringify(value));
				  records = records + '<div class="row record">'
				  +'<div class="col-md-2">'+record.username+'</div>'
				  +'<div class="col-md-4">'+record.reason+'</div>'
				  +'<div class="col-md-3">'+record.booking_date+'</div>'
				  +'<div  class="col-md-2 icon" alt="Edit appointment" title="Edit appointment" value='+record.id+' onclick="update_appointment('+record.id+')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></div>'
				  +'<div  class="col-md-2 icon" alt="Cancel appointment" title="Cancel appointment" value='+record.id+' onclick="cancel_appointment('+record.id+')"><i class="fa fa-times" aria-hidden="true"></i></div>'
				  +'</div>';
				});
				records = '<div class="row record reocrd-bold">'
				  +'<div class="col-md-2">Name</div>'
				  +'<div class="col-md-4">Reason</div>'
				  +'<div class="col-md-3">Booking Date</div>'
				  +'</div>'
				+records;
				$('.view_appointments').html(records);
			}
		});		
}

/**
** update appointment
** @params : int id (appointment id)
** @resquest_type : GET
*/

function update_appointment(id) 
{
	$(".view_appointments").hide();
	$.ajax({
		type: 'GET',
		data: {id:id},
		url: API_URL+"viewappointment",
		success: function(result) {
			if(result){
				data = result.result;						
				data = JSON.parse(JSON.stringify(data))[0];
				$('.appointment_form').show();
				$('#full_name').val(data.username);
				$('#appointment_id').val(data.id);						
				$('#appointment_reason').val(data.reason);
				$('#appointment_time').val(data.booking_date);
				$('.form_update').show();
				$('.form_submit').hide();						
			}					
		}
	});		
}

/**
** cancel appointment (soft delete)
** @params : int id (appointment id)
** @resquest_type : POST
** @callback : get_appointments()
*/

function cancel_appointment(id) 
{
	$.ajax({
		type: 'POST',
		url: API_URL+"deleteappointment",
		data: {id: id},
		success: function(result) 
		{
			alert('Appointment cancelled successfully.');
			get_appointments();
		}
	});		
}