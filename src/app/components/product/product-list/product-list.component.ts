import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @ViewChild('detailDialogTemplate') detailDialogTemplate!: TemplateRef<any>;
  products: Product[] = [];
  imageUrl: string = `http://${environment.env}:3002/v1/files/`;
  displayedColumns: string[] = ['name', 'description', 'price', 'image', 'stock', 'actions'];

  constructor(private productService: ProductService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  modifyProduct(productId: string) {
    this.router.navigate(['/product/modify', productId]);
  }

  deleteProduct(productId: string) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.closeDialog();
      this.loadProducts();
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
