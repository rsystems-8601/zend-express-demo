import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})


export class ViewappointmentService {

	constructor(private http: HttpClient) { }
  
	getData(){
		return this.http.get<myData>('http://127.0.0.1:8080/viewappointment');
		
		
	}
	
	getData2(){
	  return [{
		  "heroesUrl": "api/heroes",
		  "textfile": "assets/textfile.txt"
	  },
	  {
		  "heroesUrl": "api/heroes",
		  "textfile": "assets/textfile.txt"
	  },
	  {
		  "heroesUrl": "api/heroes",
		  "textfile": "assets/textfile.txt"
	  }
	  
	  ]
	}
  
}
