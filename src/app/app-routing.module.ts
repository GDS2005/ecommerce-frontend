import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { SingUpComponent } from './components/sing-up/sing-up.component';

const routes: Routes = [
  {path: 'user-list', component:UserListComponent},
  {path: 'sing-up', component:SingUpComponent},
  {path: '', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
