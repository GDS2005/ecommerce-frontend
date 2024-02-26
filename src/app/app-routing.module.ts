import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RegisterComponent } from './components/register/register.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { RouteGuard } from './services/route-guard';

const routes: Routes = [
  {path: 'user-list', component:UserListComponent},
  {path: 'register', component:RegisterComponent},
  {path: "edit/:id", component:UserFormComponent},
  {path: "add", component:UserFormComponent},
  {path: '', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
