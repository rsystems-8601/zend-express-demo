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
	result: Array<>
}

interface delData {
	status : boolean,
	result:boolean
}

interface upData {
	status : boolean,
	result:boolean
}

@Injectable({
	providedIn: 'root'
})


export class ViewappointmentService {

	constructor(private http: HttpClient) { }
  
	getData(id): Observable<myData>{
		if(id){			
			return this.http.get<myData>('http://127.0.0.1:8080/viewappointment?id='+id);
		}else{
			return this.http.get<myData>('http://127.0.0.1:8080/viewappointment');
		}
	}
	
	deleteData(id): Observable<delData>{
		let body = new FormData();
			body.append('id', id);
		return this.http.post<delData>('http://127.0.0.1:8080/deleteappointment', body);
	}
	
	updateData(id,username,reason,booking_date): Observable<upData>{
		let body = new FormData();
			body.append('appointment_id', id);
			body.append('full_name', username);
			body.append('appointment_time', booking_date);
			body.append('appointment_reason', reason);
		return this.http.post<upData>('http://127.0.0.1:8080/updateappointment', body);
	}
	
	createData(username,reason,booking_date): Observable<upData>{
		let body = new FormData();			
			body.append('full_name', username);
			body.append('appointment_time', booking_date);
			body.append('appointment_reason', reason);
		return this.http.post<upData>('http://127.0.0.1:8080/createappointment', body);
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
