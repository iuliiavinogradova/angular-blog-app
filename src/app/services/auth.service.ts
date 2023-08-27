import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'user';
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private router: Router) {} // Inject the Router

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  getLoggedInStatus(): BehaviorSubject<boolean> {
    return this.loggedIn;
  }

  login(username: string, password: string): boolean {
    if (this.validateUser(username, password)) {
      localStorage.setItem(this.storageKey, username);
      this.loggedIn.next(true); // Update BehaviorSubject value
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey); // Remove user from storage
    this.loggedIn.next(false); // Update BehaviorSubject value
    this.router.navigate(['/login']); // Navigate to the login page
  }

  register(username: string, password: string): boolean {
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (!localStorage.getItem(username)) {
      localStorage.setItem(username, hashedPassword);
      return true;
    }
    return false;
  }

  private validateUser(username: string, password: string): boolean {
    const storedHashedPassword = localStorage.getItem(username);

    if (storedHashedPassword !== null) {
      return bcrypt.compareSync(password, storedHashedPassword);
    }

    return false;
  }
}
