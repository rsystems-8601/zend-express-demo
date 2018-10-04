import { Component, OnInit } from '@angular/core';
import { ViewappointmentService } from '../viewappointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-updateappointment',
  templateUrl: './updateappointment.component.html',
  styleUrls: ['./updateappointment.component.css'],
  
})
export class UpdateappointmentComponent implements OnInit {

	public appointment_id:number;	
	public full_name:String;
	public appointment_reason:String;
	public appointment_time:Date ;	


	constructor(private getViewAppintmentService : ViewappointmentService, private route: ActivatedRoute, private router: Router ) { 
		if(this.route.snapshot.paramMap.get('id')){
			this.appointment_id = parseInt(this.route.snapshot.paramMap.get('id'));
		
			this.view_appointment(this.appointment_id);
		}
	}

	ngOnInit() {
		
	}  
  
	view_appointment(id=0){
		this.getViewAppintmentService.getData(id).subscribe(data =>{
			//console.log(data);
			if(data && data.result) {
				//console.log(data.result);				
				this.full_name= data.result[0].username;
				this.appointment_reason = data.result[0].reason;
				this.appointment_time = data.result[0].booking_date;
			}
			
		});
	}
	
	update_appointment(id,username,reason,booking_date){
		this.getViewAppintmentService.updateData(id,username,reason,booking_date).subscribe(data =>{
			//console.log(data);
			if(data && data.result) {
				console.log(data.result);
				if(data.result){
					//self.router.navigate(['/home']);
					this.router.navigate(['/home']);
				}
			}
			
		});
	}
	
	onSubmit(form: NgForm) {
		if (form.valid) {
		 // console.log(form.value.appointment_id);
		  this.update_appointment(form.value.appointment_id,
		  form.value.full_name,
		  form.value.appointment_reason,
		  form.value.appointment_time)
		}
	}

}
