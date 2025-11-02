import { Routes } from '@angular/router';
import { Signin } from './pages/login/signin';
import { loginAuthGuard } from './guards/login-auth-guard';
import { authGuard } from './guards/auth-guard';
import { Layout } from './pages/layout/layout';
import { TransactionsTable } from './pages/transactions-table/transactions-table';
import { TransactionForm } from './pages/transaction-form/transaction-form';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [
  {
    path: 'signup',
    component: Signup,
    canActivate: [loginAuthGuard],
  },
  {
    path: 'signin',
    component: Signin,
    canActivate: [loginAuthGuard], // impede ir para login se já autenticado
  },
  {
    path: '',
    redirectTo: 'signin',
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
    redirectTo: 'signin',
  },
];
