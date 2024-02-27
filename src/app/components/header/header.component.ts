import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  loggedIn: boolean = false;

  constructor(private auth: AuthService){}

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(){
    console.log("Trying to logout")
    this.auth.logout();
  }
}
