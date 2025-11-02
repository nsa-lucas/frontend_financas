import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../../services/user';
import { PrimaryButton } from '../../components/primary-button/primary-button';
import { UserAuthService } from '../../services/user-auth';

@Component({
  selector: 'app-login',
  imports: [PrimaryButton, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.css',
})
export class Signin implements OnInit {
  inputError = {
    message: '',
    error: false,
    input: '',
  };

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  private readonly _userService = inject(UserService);
  private readonly _userAuthService = inject(UserAuthService);
  private readonly _router = inject(Router);

  ngOnInit() {
    this.userForm.get('email')?.valueChanges.subscribe(() => {
      this.validateEmail();
    });
    this.userForm.get('password')?.valueChanges.subscribe(() => {
      this.validatePassword();
    });
  }

  validateEmail() {
    const emailControl = this.userForm.get('email');
    if (emailControl?.invalid && (emailControl?.dirty || emailControl?.touched)) {
      if (emailControl?.errors?.['required']) {
        this.inputError = {
          message: 'Email obrigatório',
          error: true,
          input: 'email',
        };
      } else if (emailControl.errors?.['email']) {
        this.inputError = {
          message: 'Formato de email inválido',
          error: true,
          input: 'email',
        };
      }
    } else {
      this.inputError = {
        message: '',
        error: false,
        input: '',
      };
    }
  }

  validatePassword() {
    const passwordControl = this.userForm.get('password');
    if (passwordControl?.invalid && (passwordControl?.dirty || passwordControl?.touched)) {
      if (passwordControl?.errors?.['required']) {
        this.inputError = {
          message: 'Senha obrigatória',
          error: true,
          input: 'password',
        };
      } else if (passwordControl.errors?.['minlength']) {
        this.inputError = {
          message: 'A senha deve conter pelo menos 8 caracteres',
          error: true,
          input: 'password',
        };
      }
    } else {
      this.inputError = {
        message: '',
        error: false,
        input: '',
      };
    }
  }

  login() {
    if (this.userForm.invalid) {
      this.inputError = {
        message: 'Formato de email ou senha inválidos',
        error: true,
        input: 'login',
      };
      return;
    }

    this._userService
      .login(
        this.userForm.get('email')?.value as string,
        this.userForm.get('password')?.value as string
      )
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.inputError = {
            message: '',
            error: false,
            input: '',
          };
          this._userAuthService.setUserToken(response.data.token);

          this._router.navigate(['/transactions']);
        },
        error: (error) => {
          this.inputError = {
            message: 'Email ou senha inválidos',
            error: true,
            input: 'login',
          };
        },
      });
  }
}
