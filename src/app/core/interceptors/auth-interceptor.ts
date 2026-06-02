import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('user');

  const yangiSorov = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

  return next(yangiSorov).pipe(
    catchError((xato: HttpErrorResponse) => {
      if (xato.status === 401) {
        localStorage.removeItem('user');
        router.navigate(['/login']);
      }
      return throwError(() => xato);
    }),
  );
};
