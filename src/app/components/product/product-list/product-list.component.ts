import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { Stock, StockResults } from 'src/app/interfaces/stock';
import { ProductService } from 'src/app/services/product/product.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @ViewChild('detailDialogTemplate') detailDialogTemplate!: TemplateRef<any>;
  products: Product[] = [];
  stock: Stock[] = [];
  displayedColumns: string[] = ['name', 'description', 'price', 'image', 'stock', 'actions'];

  constructor(private productService: ProductService, private stockService: StockService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadStock();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
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

  modifyProduct(productId: string) {
    this.router.navigate(['/product/modify', productId]);
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.closeDialog();
      this.loadProducts(); // Reload products after deletion
    });
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
