import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @ViewChild('detailDialogTemplate') detailDialogTemplate!: TemplateRef<any>;
  products: Product[] = [];
  quantity!: number;
  errorMessage!: string;
  showAlert = false;
  message = '';

  constructor(private productService: ProductService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  buyProduct(productId: string, quantity: number): void {

    if (1 > 1) {

      if (0 >= 0) {
        
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
