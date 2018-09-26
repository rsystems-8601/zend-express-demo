import { Component, OnInit } from '@angular/core';
import { ViewappointmentService } from '../viewappointment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updateappointment',
  templateUrl: './updateappointment.component.html',
  styleUrls: ['./updateappointment.component.css']
})
export class UpdateappointmentComponent implements OnInit {

	public update_id:number = 0;
	public records=[];
	public username:String = "";
	public reason:String = "";
	public booking_date:Date = "";
	

  constructor(private getViewAppintmentService : ViewappointmentService, private route: ActivatedRoute ) { 
  
		this.update_id = this.route.snapshot.paramMap.get('id');
		
		this.view_appointment(this.update_id);
	}

  ngOnInit() {
  }
  
  
	view_appointment(id=false){
		this.getViewAppintmentService.getData(id).subscribe(data =>{
			console.log(data);
			if(data && data.result) {
				//console.log(data.result);				
				this.username= data.result[0].username;
				this.reason = data.result[0].reason;
				this.booking_date = data.result[0].booking_date;
			}
			
		});
	}
	
	update_appointment(id,username,reason,booking_date){
		this.getViewAppintmentService.updateData(id,username,reason,booking_date).subscribe(data =>{
			console.log(data);
			if(data && data.result) {
				//console.log(data.result);
				this.records = data.result[0];
			}
			
		});
	}

}
