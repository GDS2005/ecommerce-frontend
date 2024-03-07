import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthGuard } from './guard/auth.guard';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


const routes: Routes = [
  {
    path: 'user-list',
    loadChildren: () => import('./components/user-list/user-list.module').then(m => m.UserListModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product-list',
    loadChildren: () => import('./components/product-list/product-list.module').then(m => m.ProductListModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product-card',
    loadChildren: () => import('./components/product-card/product-card.module').then(m => m.ProductCardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'stock/:id',
    loadChildren: () => import('./components/stock/stock.module').then(m => m.StockModule),
    canActivate: [AuthGuard]
  },
  {
    path: "add-user",
    component:UserFormComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: "edit-user/:id",
    component:UserFormComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: "add-product",
    component:ProductFormComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: "edit-product/:id",
    component:ProductFormComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: "product-detail/:id",
    component:ProductDetailComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component:LoginComponent
  }, 
  {
    path: 'home',
    component:HomeComponent,
    canActivate: [AuthGuard]
  }, 
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'error',
    component:ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
