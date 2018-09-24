import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';

interface user {
	id : String,
	username: String,
	reason: String,
	booking_date: Date,
	end_time: Date,
	is_deleted: boolean
}


interface myData {
	status : boolean,
	result: Array<user>
}

@Injectable({
	providedIn: 'root'
})


export class ViewappointmentService {

	constructor(private http: HttpClient) { }
  
	getData(): Observable<myData> {
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
