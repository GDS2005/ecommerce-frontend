import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
//import { UserListComponent } from './components/user-list/user-list.component';
import { RegisterComponent } from './components/register/register.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthGuard } from './guard/auth.guard';
import { ProductListComponent } from './components/product-list/product-list.component';


const routes: Routes = [
  {
    path: '',
    //component:UserListComponent, 
    loadChildren: () => import('./components/user-list/user-list.module').then(m => m.UserListModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component:LoginComponent
  }, 
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: "edit/:id",
    component:UserFormComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: "add",
    component:UserFormComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component:ProductListComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
