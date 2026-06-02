import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/mahsulotlar/mahsulotlar').then((m) => m.Mahsulotlar),
  },
  {
    path: 'mahsulot/:id',
    loadComponent: () =>
      import('./features/mahsulot-detail/mahsulot-detail').then((m) => m.MahsulotDetail),
  },
  {
    path: 'savat',
    canActivate: [authGuard],
    loadComponent: () => import('./features/savat/savat').then((m) => m.Savat),
  },
  {
    path: 'buyurtma',
    canActivate: [authGuard],
    loadComponent: () => import('./features/buyurtma/buyurtma').then((m) => m.Buyurtma),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
