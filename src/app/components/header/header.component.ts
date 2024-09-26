import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  userRole: string | undefined;
  isMenuOpen: boolean = false;

  constructor(private auth: AuthService){}

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  isUser(): boolean {
    return localStorage.getItem('role') === 'user';
  }

  isVisitor(): boolean {
    return localStorage.getItem('role') === null;
  }

  logout(){
    this.auth.logout();
  }
}
