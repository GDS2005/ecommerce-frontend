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

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    // Get the 'Add' dropdown element
    const addDropdown = document.getElementById('addDropdown');
    // Get the 'Add' link element
    const addLink = document.querySelector('.add-link');

    // Check if addLink is not null before adding event listener
    addLink?.addEventListener('click', function(event) {
      event.preventDefault();
      addDropdown?.classList.toggle('hidden');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      if (!addDropdown?.contains(event.target as Node) && !addLink?.contains(event.target as Node)) {
        addDropdown?.classList.add('hidden');
      }
    });
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout(){
    this.auth.logout();
  }
}
