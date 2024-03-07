import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Stock, StockResults } from 'src/app/interfaces/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private apiUrl = 'http://localhost:3000/v1/stock';

  constructor(private http: HttpClient) { }

  getStocks(): Observable<StockResults> {
    return this.http.get<StockResults>(this.apiUrl);
  }

  createStock(request: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.apiUrl, request);
  }

  updateStock(product: string, quantity: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${product}`, { quantity });
  }
}
