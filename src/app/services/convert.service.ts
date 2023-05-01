import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {
  private apiKey = '2eef27bd82888dbba68a3453565186b8b005fc61';
  private apiUrl = 'https://api.getgeoapi.com/v2/currency/convert';

  constructor(private http: HttpClient) { }

  convertCurrency(from: string, to: string, amount: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('api_key', this.apiKey);
    params = params.append('from', from);
    params = params.append('to', to);
    params = params.append('amount', amount.toString());
    params = params.append('format', 'json');

    return this.http.get<any>(this.apiUrl, { params: params });
  }
}
