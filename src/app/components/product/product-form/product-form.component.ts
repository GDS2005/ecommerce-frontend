import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCreate } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('detailDialogTemplate') detailDialogTemplate!: TemplateRef<any>;
  mode!: 'add' | 'modify';
  productForm!: FormGroup;
  id!: String;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
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
            this.openDialog("update");
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
        this.openDialog("create");
        }, error => {
          console.error('Error creating product:', error);
        });
    }
  }

  openDialog(data: string): void {
    this.dialog.open(this.detailDialogTemplate, {
        width: '400px',
        data: data
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
    window.location.reload();
  }
  
  goBack(): void {
    this.closeDialog();
    this.router.navigate(['product/list']);
  }
}