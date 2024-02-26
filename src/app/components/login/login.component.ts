import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Handle successful login response here
        this.authService.saveTokens(response.tokens);
        console.log('Login successful', response);
        // You can store the access token in localStorage or a service for future requests
        this.router.navigate(['/user-list']);
      },
      (error) => {
        // Handle login error here
        console.error('Login error', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}