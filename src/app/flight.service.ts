import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  

@Injectable({  
  providedIn: 'root'  
})  
export class FlightService { 
  
    private baseUrl = 'http://localhost:9090/api/';  
    
    constructor(private http:HttpClient) { }  
    
    getFlightList(): Observable<any> {  
      return this.http.get(`${this.baseUrl}`+'/flight/view');  
    }  
    
    createFlight(flight: object): Observable<object> {  
      return this.http.post(`${this.baseUrl}`+'/flight/add', flight);  
    }  
    
    deleteFlight(id: number): Observable<any> {  
      return this.http.delete(`${this.baseUrl}/flight/${id}`, { responseType: 'text' });  
    }  
    
    getFlight(id: number): Observable<Object> {  
      return this.http.get(`${this.baseUrl}/flight/${id}`);  
    }  
    
    updateFlight(id: number, value: any): Observable<Object> {  
      return this.http.post(`${this.baseUrl}/flight/${id}`, value);  
    }  
}
