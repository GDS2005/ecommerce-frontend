import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {
  name!: string;
  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private service: AuthService, private router: Router) { }

  register(): void {
    this.service.register(this.name, this.email, this.password).subscribe(
      (response) => {
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Login error', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
