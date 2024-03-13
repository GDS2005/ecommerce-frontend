import { Component, OnInit } from '@angular/core';
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

  constructor(private auth: AuthService){}

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'admin';
  }

  logout(){
    this.auth.logout();
  }
}
