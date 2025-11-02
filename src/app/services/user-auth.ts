import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  getUserToken(): string | null {
    return localStorage.getItem('token');
  }

  setUserToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeUserToken() {
    localStorage.removeItem('token');
  }
}
