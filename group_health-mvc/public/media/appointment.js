$(function() {
		API_URL = "http://127.0.0.1:8080/";
		
		// pull appointments on page load
		prepare();
		get_appointments();	

		$('#btn_submit').click(function(){
			if($('#full_name').val() !=''  && $('#appointment_reason').val() !='' && $('#appointment_time').val() !='' )
			{			
				$.ajax({
					type: 'GET',
					data: $('#request_form').serialize(),
					url: API_URL+"createappointment",						
					success: function(result) {
						if(result.status){
							alert('Appointment booked successfully.');								
							prepare();
							get_appointments();
						}							
					}
				});
			}else{
				alert('Please fill in all the fields.');
			}
		});	
		
		$('#btn_update').click(function(){
			if($('#full_name').val() !=''  && $('#appointment_reason').val() !='' && $('#appointment_time').val() !='' )
			{					
				$.ajax({
					type: 'GET',
					data: $('#request_form').serialize(),
					url: API_URL+"updateappointment",						
					success: function(result) {
						if(result.status){															
							prepare();
							get_appointments();
							alert('Appointment updated successfully.');
						}							
					}
				});
			}else{
				alert('Please fill in all the fields.');
			}
		});	
	
});

	function reset_form(){
		$('#request_form')[0].reset();		
		$('.form_update').hide();
		$('.form_submit').show();		
	}
	function book_appointment() {		
		reset_form();		
		$("input:text:visible:first").focus();	
		$(".view_appointments").hide();
		$(".appointment_form").show();
	}
	
	function prepare() {
		reset_form();
		$(".view_appointments").show();
		$(".appointment_form").hide();
	}
	
	function get_appointments() {
		$.ajax({
				type: 'GET',
				url: API_URL+"viewappointment",
				success: function(result) {
					var records = '';
					result = result.result;
					$.each( result, function( key, value ) {
					  record = JSON.parse(JSON.stringify(value));
					  records = records + '<div class="record">'+'<div>'+record.booking_date+'</div><div value='+record.id+' onclick="update_appointment('+record.id+')">Edit</div><div value='+record.id+' onclick="cancel_appointment('+record.id+')">Cancel</div></div>';
					});
					records = "<div class='records'>"+records+"</div>";
					$('.view_appointments').html(records);
				}
			});		
	}

	function update_appointment(id) {
		
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
	
	function cancel_appointment(id) {
		$.ajax({
			type: 'GET',
			url: API_URL+"deleteappointment",
			data: {id: id},
			success: function(result) {
				alert('Appointment cancelled successfully.');
				get_appointments();
			}
		});		
	}