import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
	
	records = [];	
	
	constructor(private getSearchService : SearchService ) { 
		
	
	}

	ngOnInit() {
	  
		this.view_appointment();
	  
	}
	
	view_appointment(id=false){
		this.getSearchService.getData(id).subscribe(data =>{
			//console.log(data);
			if(data && data.result) {
				//console.log(data.result);
				this.records = data.result;
			}			
		});
	}

}
