import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { Stock } from 'src/app/interfaces/stock';
import { ProductService } from 'src/app/services/product/product.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product!: Product;
  stock: Stock[] = [];

  constructor(private productService: ProductService, private stockService: StockService ,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProduct();
    this.loadStock();
  }

  getProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(productId)
      .subscribe(product => this.product = product);
  }

  loadStock(): void {
    this.stockService.getStocks().subscribe(response => {
      // Check if the response has the 'results' key containing an array of stock items
      if (response.results && Array.isArray(response.results)) {
        // Extract the stock data from the 'results' array
        this.stock = response.results;
      } else {
        console.error('Unexpected stock data format:', response);
      }
    });
  }

  getStockQuantity(productId: string): number {
    const productStock = this.stock.find(s => s.product === productId);
    return productStock ? productStock.quantity : 0;
  }

  buyProduct(productId: string): void {
    const productStock = this.stock.find(s => s.product === productId);
    if (productStock && productStock.quantity > 0) {
      this.stockService.updateStock(productId, productStock.quantity - 1).subscribe(() => {
        // Update stock locally
        productStock.quantity -= 1;
      });
    }
    else{
      console.log("There is no stock for this product")
    }
  }
}
