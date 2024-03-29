import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  @ViewChild('detailDialogTemplate') detailDialogTemplate!: TemplateRef<any>;
  products!: Product[];
  selectedProduct!: string;
  quantity!: number;

  constructor(private productService: ProductService, private stockService: StockService, private router: Router, private dialog: MatDialog) { }

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
      this.openDialog()
    }, error => {
      // Handle error, like showing an error message
      console.error('Failed to update stock', error);
    });
  }

  openDialog(): void {
    this.dialog.open(this.detailDialogTemplate, {
        width: '400px'
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
  
  goBack(): void {
    this.closeDialog();
    this.router.navigate(['product/list']);
  }
}
