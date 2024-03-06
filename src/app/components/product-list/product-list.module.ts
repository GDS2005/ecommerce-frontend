import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [ProductListComponent],
  imports: [
    CommonModule,
    ProductListRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ]
})
export class ProductListModule { }
