import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';  
import {FormControl,FormGroup,Validators} from '@angular/forms';  
import { Flight } from '../flight';  

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  
  
  constructor(private flightservice:FlightService) { }  
  
  flight : Flight=new Flight();  
  submitted = false;  
  
  ngOnInit() {  
    this.submitted=false;  
  }  
  
  flightsaveform=new FormGroup({  
    flightModel:new FormControl('',[Validators.required,Validators.minLength(5) ]),  
    carrierName:new FormControl('' , [Validators.required , Validators.minLength(5) ]), 
    seatCapacity:new FormControl() 
  });  
  
  saveFlight(saveFlight){  
    this.flight=new Flight();     
    this.flight.flightModel=this.FlightModel.value;  
    this.flight.carrierName=this.CarrierName.value;  
    this.flight.seatCapacity=this.SeatCapacity.value;  
    this.submitted = true;  
    this.save();  
  }  
  
    
  
  save() {  
    this.flightservice.createFlight(this.flight)  
      .subscribe(data => console.log(data), error => console.log(error));  
    this.flight = new Flight();  
  }  
  
  get FlightModel(){  
    return this.flightsaveform.get('flightModel');  
  }  
  
  get CarrierName(){  
    return this.flightsaveform.get('carrierName');  
  }  
  
  get SeatCapacity(){  
    return this.flightsaveform.get('seatCapacity');  
  }  
  
  addFlightForm(){  
    this.submitted=false;  
    this.flightsaveform.reset();  
  }  
}  
