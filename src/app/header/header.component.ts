import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() isLogged!: boolean; // Добавляем ! модификатор

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn();
  }

login(): void {
    if (this.isLogged) {
      this.authService.logout();
      this.isLogged = false;
      this.router.navigate(['/login']); // Redirect to login page after logout
    } else {
      this.router.navigate(['/login']); // Redirect to login page
    }
  }


  logout(): void {
    this.authService.logout();
    this.isLogged = false;
  }
}

