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
    if (!this.validateEmail()) {
      this.errorMessage = 'Invalid email format';
      return;
    }

    if (!this.validatePassword()) {
      this.errorMessage = 'Password must contain at least 8 characteres and 1 number';
      return;
    }

    this.service.register(this.name, this.email, this.password).subscribe(
      (response) => {
        this.openDialog()
      },
      (error) => {
        this.errorMessage = 'User or Email already taken';
      }
    );
  }

  validateEmail(): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(this.email);
  }

  validatePassword(): boolean {
    const minLength = 8;
    const letterRegex = /[a-zA-Z]/;
    const numberRegex = /[0-9]/;
  
    return this.password.length >= minLength && letterRegex.test(this.password) && numberRegex.test(this.password);
  }

  /*
  validatePassword(): boolean {
    const letterRegex = /[a-zA-Z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[8-16]/;

    return letterRegex.test(this.password) && uppercaseRegex.test(this.password) && numberRegex.test(this.password);
  }
  */

  openDialog(): void {
    this.dialog.open(this.detailDialogTemplate, {
        width: '400px'
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
    this.router.navigate(['login']);
  }
}
