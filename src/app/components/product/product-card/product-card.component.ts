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
  quantity!: number;
  errorMessage!: string;
  showAlert = false;
  message = '';

  constructor(private productService: ProductService, private stockService: StockService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.loadStock();
    });
  }

  loadStock(): void {
    this.stockService.getStocks().subscribe(response => {
      if (response.results && Array.isArray(response.results)) {
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

  buyProduct(productId: string, quantity: number): void {
    const productStock = this.stock.find(s => s.product === productId);
    if (productStock && productStock.quantity >= quantity) {
      const updatedQuantity = productStock.quantity - quantity;
      if (updatedQuantity >= 0) {
        this.stockService.updateStock(productId, updatedQuantity).subscribe(() => {
          productStock.quantity = updatedQuantity;
          this.closeDialog();
        });
      } else {
        this.errorMessage = "Not enough stock available for this product.";
      }
    } else {
      this.errorMessage = "There is not enough stock for this product.";
    }
  }
  openDialog(product: Product): void {
    this.dialog.open(this.detailDialogTemplate, {
        width: '400px',
        data: product
    });
  }

  closeDialog(): void {
      this.dialog.closeAll();
      this.errorMessage = '';
  }

  detail(productId: string): void {
    this.router.navigate(['/product/detail', productId]);
  }
}
