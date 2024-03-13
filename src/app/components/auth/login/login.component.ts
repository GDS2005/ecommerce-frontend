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
        this.authService.saveTokens(response.tokens);
        localStorage.setItem('role', response.user.role);
        this.router.navigate(['product']);
      },
      (error) => {
        console.error('Login error', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}