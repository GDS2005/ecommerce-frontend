import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { TransactionProduct } from 'src/app/interfaces/transaction';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @ViewChild('detailDialogTemplate') detailDialogTemplate!: TemplateRef<any>;
  private cart = new BehaviorSubject<TransactionProduct[]>([]);
  cart$ = this.cart.asObservable();
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

  addToCart(product: Product, quantity: number) {
    const currentCart = this.cart.value;
    const existingProduct = currentCart.find(item => item.productId._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      currentCart.push({ productId: product, quantity });
    }

    this.cart.next(currentCart);
  }

  removeFromCart(productId: string) {
    const currentCart = this.cart.value.filter(item => item.productId._id !== productId);
    this.cart.next(currentCart);
  }

  clearCart() {
    this.cart.next([]);
  }

  detail(productId: string): void {
    this.router.navigate(['/transaction/cart', productId]);
  }
}
