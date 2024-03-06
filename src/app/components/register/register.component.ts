import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name!: string;
  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private service: AuthService, private router: Router) { }

  register(): void {
    this.service.register(this.name, this.email, this.password).subscribe(
      (response) => {
        this.router.navigate(['login']);
      },
      (error) => {
        console.error('Login error', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
