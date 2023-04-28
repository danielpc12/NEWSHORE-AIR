import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/Flight';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = 'https://recruiting-api.newshore.es/api/flights/0';

  constructor(private http: HttpClient) { }

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.url);
  }  
}
