import { Component, OnInit } from '@angular/core';
import { ViewappointmentService } from '../viewappointment.service';


interface myData {
	obj : Object
}

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})




export class HomeComponent implements OnInit {

	records = {};
	
	fixrecord = {};
	
	constructor(private getViewAppintmentService : ViewappointmentService ) { 
		
	
	}

	ngOnInit() {
		
		this.fixrecord = this.getViewAppintmentService.getData2();
		
		this.getViewAppintmentService.getData().subscribe(data =>{
			//console.log(data.result)
			this.records = data.result
		})
	}

}



