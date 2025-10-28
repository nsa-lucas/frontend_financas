import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { loginAuthGuard } from './guards/login-auth-guard';
import { authGuard } from './guards/auth-guard';
import { Layout } from './pages/layout/layout';
import { TransactionsTable } from './pages/transactions-table/transactions-table';
import { TransactionForm } from './pages/transaction-form/transaction-form';

export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    canActivate: [loginAuthGuard], // impede ir para login se já autenticado
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Layout,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'transactions',
        component: TransactionsTable,
      },
      {
        path: 'new-transaction',
        component: TransactionForm,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
