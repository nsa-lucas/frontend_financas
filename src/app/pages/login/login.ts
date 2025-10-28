import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Router } from '@angular/router';

import { UserService } from '../../services/user';
import { PrimaryButton } from '../../components/primary-button/primary-button';
import { UserAuthService } from '../../services/user-auth';

@Component({
  selector: 'app-login',
  imports: [PrimaryButton, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  inputErrorEmail = {
    message: '',
    error: false,
  };
  inputErrorPassword = {
    message: '',
    error: false,
  };
  inputLoginInvalid = {
    message: '',
    error: false,
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
        this.inputErrorEmail = {
          message: 'Email obrigatório',
          error: true,
        };
      } else if (emailControl.errors?.['email']) {
        this.inputErrorEmail = {
          message: 'Formato de email inválido',
          error: true,
        };
      }
    } else {
      this.inputErrorEmail = {
        message: '',
        error: false,
      };
    }
  }

  validatePassword() {
    const passwordControl = this.userForm.get('password');
    if (passwordControl?.invalid && (passwordControl?.dirty || passwordControl?.touched)) {
      if (passwordControl?.errors?.['required']) {
        this.inputErrorPassword = {
          message: 'Senha obrigatória',
          error: true,
        };
      } else if (passwordControl.errors?.['minlength']) {
        this.inputErrorPassword = {
          message: 'A senha deve conter pelo menos 8 caracteres',
          error: true,
        };
      }
    } else {
      this.inputErrorPassword = {
        message: '',
        error: false,
      };
    }
  }

  login() {
    if (this.userForm.invalid) {
      this.inputLoginInvalid = {
        message: 'Formato de email ou senha inválidos',
        error: true,
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
          this.inputErrorEmail = {
            message: '',
            error: false,
          };
          this.inputErrorPassword = {
            message: '',
            error: false,
          };
          this.inputLoginInvalid = {
            message: '',
            error: false,
          };
          this._userAuthService.setUserToken(response.data.token);

          this._router.navigate(['/transactions']);
        },
        error: (error) => {
          this.inputLoginInvalid = {
            message: 'Email ou senha inválidos',
            error: true,
          };
        },
      });
  }
}
