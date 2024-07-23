import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';

const routes: Routes = [
  {
    path: '',
    component: ProductCardComponent
  },
  {
    path: 'create',
    component: ProductFormComponent
  },
  {
    path: 'modify/:id',
    component: ProductFormComponent
  },
  {
    path: 'list',
    component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
