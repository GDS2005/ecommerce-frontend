import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  data: Product[] = [
    {
      name: 'Laptop',
      description: 'Powerful laptop for work and entertainment',
      price: 999,
      user: 'admin',
      image: 'https://example.com/laptop.jpg'
    },
    {
      name: 'Smartphone',
      description: 'Feature-packed smartphone with latest technology',
      price: 699,
      user: 'admin',
      image: 'https://example.com/smartphone.jpg'
    },
    {
      name: 'Headphones',
      description: 'High-quality headphones for immersive audio experience',
      price: 199,
      user: 'admin',
      image: 'https://example.com/headphones.jpg'
    }
  ];
}
