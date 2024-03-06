import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  data: any;

  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.service.getProduct(localStorage.getItem('access_token')).subscribe(response => {
      this.data = response;
      console.log(this.data)
    });
  }
}
