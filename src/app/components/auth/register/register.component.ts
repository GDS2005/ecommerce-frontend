import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('detailDialogTemplate') detailDialogTemplate!: TemplateRef<any>;
  name!: string;
  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private service: AuthService, private router: Router, private dialog: MatDialog) { }

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
    this.closeDialog()
  }

  openDialog(): void {
    this.dialog.open(this.detailDialogTemplate, {
        width: '400px'
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
