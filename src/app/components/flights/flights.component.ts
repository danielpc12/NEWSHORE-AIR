import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Flight } from '../../models/Flight';
import { Transport } from 'src/app/models/Transport';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  public flights: Flight[];
  public allFlights: Flight[];
  public flightsForm: FormGroup;

  constructor(private apiService: ApiService) { 
    this.flights = [];
    this.allFlights = [];
    this.flightsForm = new FormGroup({
      origin: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.apiService.getFlights().subscribe(
      data => {
        console.log('API Response:', data);
        this.allFlights = data.map((flight: any) => {
          return new Flight(new Transport(flight.flightCarrier, flight.flightNumber), flight.departureStation, flight.arrivalStation, flight.price);
        });
        console.log('Flights:', this.allFlights);
        this.flights = [...this.allFlights];
      },
      error => {
        console.log(error);
      }
    );
  }  

  onSearch(form: any){
    console.log(form)
    const origin = this.flightsForm.get('origin')?.value;
    const destination = this.flightsForm.get('destination')?.value;
    this.flights = this.allFlights.filter(flight => {
      return flight.getOrigin() === origin && flight.getDestination() === destination;
    });
  }

  isDifferent(): boolean {
    const origin = this.flightsForm.get('origin')?.value;
    const destination = this.flightsForm.get('destination')?.value;
  
    if (!origin || !destination) {
      return false;
    }
  
    return origin === destination;
  }
  
}
