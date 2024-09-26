import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductCardComponent
    
  },
  {
    path: 'create',
    component: ProductFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modify/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
