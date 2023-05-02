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
  public filteredFlightsByOriginAndDestination: Flight[] = [];

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
        this.allFlights = data.map((flight: any) => {
          return new Flight(new Transport(flight.flightCarrier, flight.flightNumber), flight.departureStation, flight.arrivalStation, flight.price);
        });
      },
      error => {
        console.log(error);
      }
    );
  }  

  public lastCurrency: string = 'USD';

  onSearch(form: any) {
  const origin = this.flightsForm.get('origin')?.value;
  const destination = this.flightsForm.get('destination')?.value;
  const currency = this.flightsForm.get('currency')?.value;

  this.convertService.convertCurrency(this.lastCurrency, currency, 1).subscribe(
    data => {
      const conversionRate = data.rates[currency].rate;
      this.lastCurrency = currency;
        this.flights = this.allFlights.filter(flight => {
          const price = Number(flight.getPrice()) * Number(conversionRate);
          flight.setPrice(Number(price.toFixed(2)));
          return flight.getOrigin() === origin && flight.getDestination() === destination;
        });
        this.flights = this.filterFlightsByOriginAndDestination();  
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
  
    if (!origin || !destination) {
      return false;
    }
  
    return origin === destination;
  }
  
  hasFlights(): boolean {
    const origin = this.flightsForm.get('origin')?.value;
    const destination = this.flightsForm.get('destination')?.value;
  
    if (!origin || !destination || this.isSearched) {
      return false;
    }
    const flights = this.flights.concat(this.filteredFlightsByOriginAndDestination);

    return flights.length > 0;
  }

  filterFlightsByOrigin(origin: string): Flight[] {
    return this.allFlights.filter(flight => flight.getOrigin() === origin);
  }
  
  filterFlightsByDestination(destination: string): Flight[] {
    return this.allFlights.filter(flight => flight.getDestination() === destination);
  }
  
  filterFlightsByOriginAndDestination(): Flight[] {
    const origin = this.flightsForm.get('origin')?.value;
    const destination = this.flightsForm.get('destination')?.value;
    const flightsFilteredByOrigin = this.filterFlightsByOrigin(origin);
    const flightsFilteredByDestination = this.filterFlightsByDestination(destination);
    const flightsFilteredByOriginAndDestination: Flight[] = this.flights.filter(flight => flight.getOrigin() === origin && flight.getDestination() === destination);
  
    flightsFilteredByOrigin.forEach(flightByOrigin => {
      flightsFilteredByDestination.forEach(flightByDestination => {
        if (flightByOrigin.getDestination() === flightByDestination.getOrigin()) {
          flightsFilteredByOriginAndDestination.push(flightByOrigin);
          flightsFilteredByOriginAndDestination.push(flightByDestination);
        }
      });
    });
  
    return flightsFilteredByOriginAndDestination;
  }
  
  
}

