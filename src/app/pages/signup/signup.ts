import { Component, inject, OnInit } from '@angular/core';
import { PrimaryButton } from '../../components/primary-button/primary-button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [PrimaryButton, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  inputError = {
    message: '',
    error: false,
    input: '',
  };

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  private readonly _userService = inject(UserService);
  private readonly _router = inject(Router);

  ngOnInit() {
    this.userForm.get('name')?.valueChanges.subscribe(() => {
      this.validateName();
    });
    this.userForm.get('email')?.valueChanges.subscribe(() => {
      this.validateEmail();
    });
    this.userForm.get('password')?.valueChanges.subscribe(() => {
      this.validatePassword();
    });
  }

  validateName() {
    const nameControl = this.userForm.get('name');
    const name = this.userForm.get('name')?.value as string;

    const verifyName = name.split(' ');

    if (nameControl?.dirty || nameControl?.touched) {
      if (nameControl?.errors?.['required']) {
        this.inputError = {
          message: 'Nome obrigatório',
          error: true,
          input: 'name',
        };
      }
      if (verifyName.length < 2 || verifyName[1].length == 0 || name.length < 7) {
        this.inputError = {
          message: 'Digite seu nome completo',
          error: true,
          input: 'name',
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
}
