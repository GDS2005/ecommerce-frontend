import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RegisterComponent } from './components/register/register.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  {path: 'user-list', component:UserListComponent, canActivate: [AuthGuard]},
  {path: 'register', component:RegisterComponent},
  {path: "edit/:id", component:UserFormComponent, canActivate: [AuthGuard]},
  {path: "add", component:UserFormComponent, canActivate: [AuthGuard]},
  {path: '', component:LoginComponent}, // I set login as the main route because is more practice for the test. In real world I need to make a path login and a home main...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
