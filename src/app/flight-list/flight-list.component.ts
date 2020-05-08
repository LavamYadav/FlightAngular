import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';  
import { Flight } from '../flight';  
import { Observable,Subject } from "rxjs";  
  
import {FormControl,FormGroup,Validators} from '@angular/forms';  
  

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  constructor(private flightservice:FlightService) { }  
  
  flightsArray: any[] = [];  
  dtOptions: DataTables.Settings = {};  
  dtTrigger: Subject<any>= new Subject();  
  
  flights: Observable<Flight[]>;  
  flight : Flight=new Flight();  
  deleteMessage=false;  
  flightlist:any;  
  isupdated = false;      
   
  
  ngOnInit() {  
    this.isupdated=false;  
    this.dtOptions = {  
      pageLength: 6,  
      stateSave:true,  
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
      processing: true  
    };     
    this.flightservice.getFlightList().subscribe(data =>{  
    this.flights =data;  
    this.dtTrigger.next();  
    })  
  }  
    
  deleteFlight(id: number) {  
    this.flightservice.deleteFlight(id)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.flightservice.getFlightList().subscribe(data =>{  
            this.flights =data  
            })  
        },  
        error => console.log(error));  
  }  
  
  updateFlight(id: number){  
    this.flightservice.getFlight(id)  
      .subscribe(  
        data => {  
          this.flightlist=data             
        },  
        error => console.log(error));  
  }  
  
  flightupdateform=new FormGroup({  
    flightNumber:new FormControl(),  
    flightModel:new FormControl(),  
    carrierName:new FormControl(),  
    seatCapacity:new FormControl()  
  });  
  
  updateFli(updfli){  
    this.flight=new Flight();   
   this.flight.flightNumber=this.FlightNumber.value;  
   this.flight.flightModel=this.FlightModel.value;  
   this.flight.carrierName=this.CarrierName.value;  
   this.flight.seatCapacity=this.SeatCapacity.value;  
   //console.log(this.SeatCapacity.value);  
     
  
   this.flightservice.updateFlight(this.flight.flightNumber,this.flight).subscribe(  
    data => {       
      this.isupdated=true;  
      this.flightservice.getFlightList().subscribe(data =>{  
        this.flights =data  
        })  
    },  
    error => console.log(error));  
  }  
  
  get FlightModel(){  
    return this.flightupdateform.get('flightModel');  
  }  
  
  get CarrierName(){  
    return this.flightupdateform.get('carrierName');  
  }  
  
  get SeatCapacity(){  
    return this.flightupdateform.get('seatCapacity');  
  }  
  
  get FlightNumber(){  
    return this.flightupdateform.get('flightNumber');  
  }  
  
  changeisUpdate(){  
    this.isupdated=false;  
  }  
}  

