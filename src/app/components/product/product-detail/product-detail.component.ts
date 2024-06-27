import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @ViewChild('detailDialogTemplate') detailDialogTemplate!: TemplateRef<any>;
  product!: Product;
  errorMessage!: string;
  quantity!: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProduct();

  }

  getProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(productId)
      .subscribe(product => this.product = product);
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
