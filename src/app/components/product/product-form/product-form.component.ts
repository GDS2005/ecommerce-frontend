import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductCreate } from 'src/app/interfaces/product';
import { Stock } from 'src/app/interfaces/stock';
import { ProductService } from 'src/app/services/product/product.service';
import { StockService } from 'src/app/services/stock/stock.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  mode!: 'add' | 'modify';
  productForm!: FormGroup;
  id!: String;

  constructor(
    private productService: ProductService,
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}
  
  ngOnInit(): void {
    this.initializeForm();
    this.route.params.subscribe(params => {
      if (params['id']){
      this.mode = 'modify';
      const productId = params['id'];
      if (productId) {
        console.log("ID:", productId)
        this.productService.getProductById(productId).subscribe(product => {
          if (product) {
            /* Populate for with data */
            this.productForm.patchValue(product); 
          }else {
            console.error('Product not found');
          }
          });
        }
      }
      else{
        this.mode = 'add';
      }
    });
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.email]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    /* Check if it's an update or an addition */
    if (this.mode === "modify"){
      this.route.params.subscribe(params => {
        const id = params['id'];
        const productData: ProductCreate = {
          name: this.productForm.value.name,
          description: this.productForm.value.description,
          image: this.productForm.value.image,
          price: this.productForm.value.price,
        };
        this.productService.updateProduct(id, productData)
          .subscribe(response => {   
            //this.stockService.updateStock(id, this.productForm.value.stock).subscribe(response => {})
            console.log('Product updated successfully:', response);
          }, error => {
            console.error('Error updating product:', error);
          });
      });
    }
    else{
      const productData: ProductCreate = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        image: this.productForm.value.image,
        price: this.productForm.value.price,
      };
      this.productService.createProduct(productData)
      .subscribe(response => {
        }, error => {
          console.error('Error creating:', error);
        });
    }
    window.location.reload();
  }
}