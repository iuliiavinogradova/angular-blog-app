import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogged: boolean;

  constructor(private authService: AuthService) {
    this.isLogged = authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.authService.getLoggedInStatus().subscribe(loggedIn => {
      this.isLogged = loggedIn;
    });
    this.authService.getLoggedInStatus().subscribe();
  }

  login(): void {
    this.authService.login('username', 'password');
    this.isLogged = true;
  }

  logout(): void {
    this.authService.logout();
  }
}
