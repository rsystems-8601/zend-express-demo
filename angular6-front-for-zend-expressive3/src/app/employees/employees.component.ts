import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl, FormGroup,FormBuilder} from '@angular/forms';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.component.html',
	styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
	
	records = [];	
	
	form = new FormGroup({
    searchid: new FormControl('1'),
  });
  
	constructor(private getSearchService : SearchService ) { 
		
	
	}
	
	infoid='';
	varset='';
	
	compare(name){
		if (name == "Rajes")
			return "1";
		else 
			return "0";
	}
	
	log = '987';

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
	
	logText(value: string): void {		
	  this.varset=this.compare(value);
      this.log = `Text changed to '${value}'\n`;
  }

}
