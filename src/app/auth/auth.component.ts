import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isLogin = false; // По умолчанию в режиме входа
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  authenticate(): void {
    const username = this.authForm.value.username;
    const password = this.authForm.value.password;

    if (this.isLogin) {
      if (this.authService.login(username, password)) {
        this.router.navigate(['/posts']); // Перенаправление на страницу постов при успешном входе
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    } else {
      if (this.authService.register(username, password)) {
        if (this.authService.login(username, password)) {
          this.router.navigate(['/posts']); // Перенаправление на страницу постов при успешной регистрации и входе
        }
      } else {
        this.errorMessage = 'Username already taken';
      }
    }
  }

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.errorMessage = null;
  }
}
