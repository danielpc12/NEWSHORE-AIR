import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Flight } from '../../models/Flight';
import { Transport } from 'src/app/models/Transport';
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  public flights: Flight[];
  public allFlights: Flight[];
  public flightsForm: FormGroup;
  public isSearched: boolean;

  constructor(private apiService: ApiService, private convertService: ConvertService) { 
    this.flights = [];
    this.allFlights = [];
    this.flightsForm = new FormGroup({
      origin: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      currency: new FormControl('USD', Validators.required)
    });
    this.isSearched = false;
  }

  ngOnInit() {
    this.apiService.getFlights().subscribe(
      data => {
        console.log('API Response:', data);
        this.allFlights = data.map((flight: any) => {
          return new Flight(new Transport(flight.flightCarrier, flight.flightNumber), flight.departureStation, flight.arrivalStation, flight.price);
        });
        console.log('Flights:', this.allFlights);
      },
      error => {
        console.log(error);
      }
    );
  }  

  onSearch(form: any) {
    const origin = this.flightsForm.get('origin')?.value;
    const destination = this.flightsForm.get('destination')?.value;
    const currency = this.flightsForm.get('currency')?.value;
    
    this.convertService.convertCurrency('USD', currency, 1).subscribe(
      data => {
        console.log('Conversion rate:', data);
        const conversionRate = data.rates[currency].rate;
        
        this.flights = this.allFlights.filter(flight => {
          flight.setPrice(Number(flight.getPrice()) * Number(conversionRate));
          return flight.getOrigin() === origin && flight.getDestination() === destination;
        });
        this.isSearched = true;
      },
      error => {
        console.log(error);
      }
    );
  }
  

  isDifferent(): boolean {
    const origin = this.flightsForm.get('origin')?.value;
    const destination = this.flightsForm.get('destination')?.value;
  
    if (!origin || !destination || !this.isSearched) {
      return false;
    }
  
    return origin === destination;
  }
  
  hasFlights(): boolean {
    const origin = this.flightsForm.get('origin')?.value;
    const destination = this.flightsForm.get('destination')?.value;
  
    if (!origin || !destination) {
      return false;
    }
  
    return this.flights.some(flight => {
      return flight.getOrigin() === origin && flight.getDestination() === destination;
    });
  }
  
  
}
