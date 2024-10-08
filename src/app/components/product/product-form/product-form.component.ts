import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCreate } from 'src/app/interfaces/product';
import { ImageService } from 'src/app/services/image/image.service';
import { ProductService } from 'src/app/services/product/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('detailDialogTemplate') detailDialogTemplate!: TemplateRef<any>;
  mode!: 'add' | 'modify';
  productForm!: FormGroup;
  errorMessage!: string;
  id!: String;
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  imageUrl: string = `http://${environment.env}:3002/v1/files/`;

  constructor(
    private productService: ProductService,
    private imageService: ImageService,
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
            this.imagePreview = this.imageUrl + product.image;
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
      image: [''],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    let imageUrl = this.productForm.value.image;

    if (this.selectedFile) {
      imageUrl = this.selectedFile.name;
      this.imageService.uploadImage(this.selectedFile)?.subscribe();
    }

    const productData: ProductCreate = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      image: imageUrl,
      price: this.productForm.value.price,
      stock: this.productForm.value.stock,
      user: localStorage.getItem('user') as string | undefined,
    };

    if (this.mode === "modify"){
      this.route.params.subscribe(params => {
        const id = params['id'];
        
        this.productService.updateProduct(id, productData)
          .subscribe(response => {   
            this.openDialog("update");
          }, error => {
            this.errorMessage =  error;
          });
      });
    }
    else{
      this.productService.createProduct(productData)
      .subscribe(response => {
        this.openDialog("create");
        }, error => {
          this.errorMessage =  error;
        });
    }
    this.imageService.uploadImage(this.selectedFile)?.subscribe()
  }

  onImagePicked(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
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
    this.dialog.closeAll();
    this.router.navigate(['product/list']);
  }
}