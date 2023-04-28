import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService: ApiService) { 
    this.flights = [];
  }

  ngOnInit() {
    this.apiService.getFlights().subscribe(
      data => {
        console.log('API Response:', data);
        this.flights = data.map((flight: any) => {
          return new Flight(new Transport(flight.flightCarrier, flight.flightNumber), flight.departureStation, flight.arrivalStation, flight.price);
        });
        console.log('Flights:', this.flights);
      },
      error => {
        console.log(error);
      }
    );
  }  
}
