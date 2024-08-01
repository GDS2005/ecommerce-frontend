import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductCreate } from 'src/app/interfaces/product';
import { Transaction } from 'src/app/interfaces/transaction';
import { ProductService } from 'src/app/services/product/product.service';
import { TransactionService } from 'src/app/services/transaction/transaction.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @ViewChild('detailDialogTemplate') detailDialogTemplate!: TemplateRef<any>;
  errorMessage!: string;
  product!: Product;
  quantity!: number;

  constructor(
    private productService: ProductService, 
    private transactionService: TransactionService,
    private route: ActivatedRoute, 
    private router: Router,
    private dialog: MatDialog,
  ) {}

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
      window.location.reload();
  }

  goBack(): void {
    this.dialog.closeAll();
    this.router.navigate(['product/list']);
  }

  buy(productId: string, quantity: number): void {

    var newStock = this.product.stock - quantity;

    console.log(newStock);
    if(newStock > -1){
      const productData: ProductCreate = {
        name: this.product.name,
        description: this.product.description,
        image: this.product.image,
        price: this.product.price,
        user: this.product.user,
        stock: newStock,
      };
      
      this.productService.updateProduct(productId, productData).subscribe(response => {
        this.closeDialog();
      }, error => {
        this.errorMessage =  error;
      });

      const transactionData: Transaction = {
        seller: this.product.user,
        buyer: localStorage.getItem('user') as string | undefined,
        product: this.product._id,
        quantity: quantity,
        status: "Iniciated",
      };

      this.transactionService.createTransaction(transactionData).subscribe(response => {
      }, error => {
        this.errorMessage =  error;
      });
    } else {
      this.errorMessage = "Not enough stock available for this product.";
    } 
  }
}
