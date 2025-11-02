import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user';
import { UserAuthService } from '../services/user-auth';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (router, state) => {
  const _userAuthService = inject(UserAuthService);
  const _userService = inject(UserService);
  const _router = inject(Router);

  const HAS_TOKEN = _userAuthService.getUserToken();

  if (!HAS_TOKEN) return _router.createUrlTree(['/signin']);

  try {
    await firstValueFrom(_userService.validateUser());

    return true;
  } catch (error) {
    _userAuthService.removeUserToken();

    return _router.navigate(['/signin']);
  }
};
