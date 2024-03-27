import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { Stock } from 'src/app/interfaces/stock';
import { ProductService } from 'src/app/services/product/product.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @ViewChild('detailDialogTemplate') detailDialogTemplate!: TemplateRef<any>;
  products: Product[] = [];
  stock: Stock[] = [];

  constructor(private productService: ProductService, private stockService: StockService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.loadStock();
    });
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
    this.closeDialog();
  }
  detail(productId: string): void {
    this.router.navigate(['/product/detail', productId]);
  }

  openDialog(product: Product): void {
    this.dialog.open(this.detailDialogTemplate, {
        width: '400px',
        data: product
    });
  }

  closeDialog(): void {
      this.dialog.closeAll();
  }
}
