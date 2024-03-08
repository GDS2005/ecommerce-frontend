import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


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
        /* ¿It's a good practice? */
        localStorage.setItem('user_id', response.user.id);
        this.authService.saveTokens(response.tokens);
        console.log('Login successful', response);
        this.router.navigate(['product-card']);
      },
      (error) => {
        console.error('Login error', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}