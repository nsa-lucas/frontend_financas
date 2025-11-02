import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ILoginSuccessResponse } from '../interfaces/login-success-response';
import { IAuthSuccessResponse } from '../interfaces/auth-success-response';
import { UserAuthService } from './user-auth';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _userAuthService = inject(UserAuthService);

  validateUser() {
    const token = this._userAuthService.getUserToken();

    return this._httpClient.get<IAuthSuccessResponse>(environment.apiUrl + '/users/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  login(email: string, password: string) {
    const body = {
      email,
      password,
    };

    return this._httpClient.post<ILoginSuccessResponse>(environment.apiUrl + '/users/signin', body);
  }

  logout() {
    const token = this._userAuthService.getUserToken();

    return this._httpClient
      .post(environment.apiUrl + '/users/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        tap(() => {
          this._userAuthService.removeUserToken();
        })
      );
  }
}
