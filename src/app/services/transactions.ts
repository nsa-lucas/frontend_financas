import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ITransactionsResponse } from '../interfaces/transactions-response';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _userAuthService = inject(UserAuthService);

  getTransactions(page: number, limit: number): Observable<ITransactionsResponse[]> {
    const token = this._userAuthService.getUserToken();

    const params = new HttpParams().set('page', page).set('limit', limit);

    return this._httpClient.get<ITransactionsResponse[]>(environment.apiUrl + '/transactions/', {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteTransactions(idTransaction: number) {
    const token = this._userAuthService.getUserToken();

    return this._httpClient.delete(environment.apiUrl + '/transactions/delete/' + idTransaction, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
