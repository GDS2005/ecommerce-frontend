import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  products!: Product[];
  selectedProduct!: string;
  quantity!: number;

  constructor(private productService: ProductService, private stockService: StockService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      // Set the default selected product if needed
      if (this.products.length > 0) {
        this.selectedProduct = this.products[0].id;
      }
    });
  }

  onSubmit() {
    console.log('Selected Product:', this.selectedProduct);
    console.log('Quantity:', this.quantity);
    
    if (!this.selectedProduct || !this.quantity) {
      return;
    }
    const selectedProduct = this.products.find(product => product.id === this.selectedProduct);
    if (!selectedProduct) {
      console.error('Selected product not found');
      return;
    }
    this.stockService.updateStock(selectedProduct.id, this.quantity).subscribe(() => {
      // Optionally handle success, like showing a success message
      console.log('Stock updated successfully');
    }, error => {
      // Handle error, like showing an error message
      console.error('Failed to update stock', error);
    });
  }

  
}
