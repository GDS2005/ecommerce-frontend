import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ErrorComponent } from './components/error/error.component';
import { NoAuthGuard } from './guard/no-auth.guard';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    loadChildren: () => import('./components/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./components/transaction/transaction.module').then(m => m.TransactionModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'error',
    component:ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'product'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
