import { Component, OnInit } from '@angular/core';
import { ViewappointmentService } from '../viewappointment.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

	records = [];	
	fixrecord = {}; 
	public show_news:boolean = false;
    public buttonName:any = 'Show News';
	public show_delete:boolean = false;
	public delete_id:number = 0;	
	
	
	constructor(private getViewAppintmentService : ViewappointmentService ) { 
		this.delete_id= 0;
	
	}

	ngOnInit() {
		
		this.fixrecord = this.getViewAppintmentService.getData2();
		
		this.view_appointment();
		
	}
	
	view_appointment(id=false){
		this.getViewAppintmentService.getData(id).subscribe(data =>{
			console.log(data);
			if(data && data.result) {
				//console.log(data.result);
				this.records = data.result;
			}
			
		});
	}
	
	toggle() {
		this.show_news = !this.show_news;

		// CHANGE THE NAME OF THE BUTTON.
		if(this.show_news)  
		  this.buttonName = "Hide News";
		else
		  this.buttonName = "Show News";
	}
	
	delete_appointment(id) {
		this.show_delete= true;		
		this.delete_id = id;
		
		this.getViewAppintmentService.deleteData(id).subscribe(data =>{
			console.log(data);
			if(data && data.result) {
				//console.log(data.result);
				this.show_delete = !data.result;
				this.view_appointment();
			}			
		});
		// CHANGE THE NAME OF THE BUTTON.		
	}

}



