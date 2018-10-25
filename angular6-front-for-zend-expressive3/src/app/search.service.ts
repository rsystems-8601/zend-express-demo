import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

	constructor(private http: HttpClient) { }
  
	getData(id): Observable<myData>{
		if(id){			
			return this.http.get<myData>('http://127.0.0.1:8080/viewappointment?id='+id);
		}else{
			return this.http.get<myData>('http://127.0.0.1:8080/viewappointment');
		}
	}
}
