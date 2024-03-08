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

  createStock(stock: Stock): Observable<Stock> {
    console.log("Stock service:")
    console.log(stock)
    return this.http.post<Stock>(this.apiUrl, stock);
  }

  updateStock(product: string, quantity: number): Observable<Stock> {
    console.log("Stock service:")
    console.log("Product:", product)
    console.log("Quantity:", quantity)
    const url = `${this.apiUrl}/${product}`;
    return this.http.patch<Stock>(url, { quantity });
  }
}
