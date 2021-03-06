import { Component, OnInit } from '@angular/core';
import { ViewappointmentService } from '../viewappointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})


export class BookappointmentComponent implements OnInit {	
	showfirstfield=4-4;
	full_name = new FormControl('');
	editMovie ="654987";
	
	var1;
	
	appointment_reason = new FormControl('');
	appointment_time = new FormControl('');
	
	loginForm: FormGroup = this.builder.group({
		full_name: this.full_name,
		appointment_reason: this.appointment_reason,
		appointment_time: this.appointment_time
	});

	constructor(private getViewAppintmentService : ViewappointmentService, private builder: FormBuilder, private route: ActivatedRoute, private router: Router ) { }

	compare(name){
		if (name == "Rajes")
			return 1;
		else 
			return 0;
	}	
	
	ngOnInit() {
		  //createappointment
		  
		  //this.form.full_name.setValue('valueE');
	}
  
    create_appointment(username,reason,booking_date){
		this.getViewAppintmentService.createData(username,reason,booking_date).subscribe(data =>{
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
  
  register() {
	  if (this.loginForm.valid) {
		    // console.log(this.loginForm.value);
			this.create_appointment(
				this.loginForm.value.full_name,
				this.loginForm.value.appointment_reason,
				this.loginForm.value.appointment_time)
			}
  }
  
  log = '987';

  logText(value: string): void {
	  this.var1= this.compare(value);
      this.log = `Text changed to '${value}'\n`;
  }

}
