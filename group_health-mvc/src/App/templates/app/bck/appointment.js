$(function() {
	$("input:text:visible:first").focus();
	var current_date = current_date();	
	$("#appointment_time").val(current_date); //yyyy-MM-ddThh:mm
	
	$("#submit").click(function() {		
		var full_name = $('#full_name').val();
		var appointment_time = $('#appointment_time').val();
		var appointment_reason = $('#appointment_reason').val();
		
		if(full_name == '' || appointment_time == '' || appointment_reason == '') {
			$('#response_container').html('All fields are mandatory'); 
		}else{
			$.ajax({
				type: 'POST',
				url: "api.php",
				data: {full_name : full_name, appointment_time : appointment_time, appointment_reason : appointment_reason},
				success: function(result) {
					if(result.error_code == 0 || 1==1) {
						$('.appointment_form').hide();
						$('#confirmed_name').html(full_name);
						
						// format appointment_time //2018-08-14T14:31
						var year = appointment_time.substr(0,4);
						var mon = appointment_time.substr(5,2);
						var day = appointment_time.substr(8,2);
						var hr = appointment_time.substr(11,2);
						var min = appointment_time.substr(14,2);
						
						var am_pm = 'AM';
						if(hr > 12) {
							hr = hr -12; // 12 hr format
							am_pm = 'PM';
						}
						appointment_time = mon+'/'+day+'/'+year+' at '+hr+':'+min+am_pm;
						
						$('#confirmed_date').html(appointment_time);
						$('.appointment_detail').show();
					}else{
						$('#response_container').html('There was some error. Please try again.');
					}
				}
			});
		}
	});
	
	function current_date() {
		var dt = new Date($.now());
		var today_date = ("0" + dt.getDate()).slice(-2);
		var current_month = ("0" + (dt.getMonth() + 1)).slice(-2);
		var current_hour = ("0" + dt.getHours()).slice(-2);
		var current_minutes = ("0" + dt.getMinutes()).slice(-2);
		
		return current_date = dt.getFullYear()+'-'+current_month+'-'+today_date+'T'+current_hour + ":" + current_minutes;
	}
	
});