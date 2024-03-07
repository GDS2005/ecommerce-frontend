import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RegisterComponent } from './components/register/register.component';
import { HeaderComponent } from './components/header/header.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { HomeComponent } from './components/home/home.component';
//import { UserListComponent } from './components/user-list/user-list.component';
//import { ProductListComponent } from './components/product-list/product-list.component';
//import { ProductCardComponent } from './components/product-card/product-card.component';
//import { StockComponent } from './components/stock/stock.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    ErrorComponent,
    UserFormComponent,
    ProductFormComponent,
    ProductDetailComponent,
    HomeComponent
    //ProductCardComponent,
    //UserListComponent,
    //StockComponent,
    //ProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
