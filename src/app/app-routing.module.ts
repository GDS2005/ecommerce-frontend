import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ErrorComponent } from './components/error/error.component';
import { NoAuthGuard } from './guard/no-auth.guard';


const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'stock',
    loadChildren: () => import('./components/stock/stock.module').then(m => m.StockModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'error',
    component:ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
