import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user';
import { UserAuthService } from '../services/user-auth';
import { firstValueFrom } from 'rxjs';

export const loginAuthGuard: CanActivateFn = async (routes, state) => {
  const _userAuthService = inject(UserAuthService);
  const _userService = inject(UserService);
  const _router = inject(Router);

  // Token Inexistente, permitir acesso ao login
  const HAS_TOKEN = _userAuthService.getUserToken();
  if (!HAS_TOKEN) return true;

  try {
    await firstValueFrom(_userService.validateUser());

    return _router.parseUrl('/transactions');
  } catch (error) {
    return true;
  }
};
