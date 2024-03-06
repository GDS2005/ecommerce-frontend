import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductResults } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:3000/v1/products';

  constructor(private http: HttpClient) { }

  getProduct(accessToken: string | null): Observable<ProductResults> {
    console.log("token:", accessToken)
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<ProductResults>(this.apiUrl, { headers });
  }

  getProductById(accessToken: string | null, id: String): Observable<Product> {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url, { headers });
  }

  createProduct(accessToken: string | null, product: Product): Observable<Product> {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<Product>(this.apiUrl, product, { headers });
  }

  updateProduct(accessToken: string | null, id: String, product: Product): Observable<Product> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    console.log(product)
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Product>(url, product, { headers });
  }

  deleteProduct(accessToken: string | null, id: String): Observable<void> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, { headers });
  }
}
