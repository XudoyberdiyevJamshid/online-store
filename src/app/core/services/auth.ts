import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/users';
  kirganFoydalanuvchi = signal<User | null>(null);
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.sessionniTekshir();
  }

  sessionniTekshir() {
    const user = localStorage.getItem('user');
    if (user) {
      this.kirganFoydalanuvchi.set(JSON.parse(user));
    }
  }

  kirish(email: string, sir: string) {
    return this.http
      .get<User[]>(`${this.url}?email=${email}`)
      .pipe(map((users) => users.filter((u) => u.sir === sir)));
  }

  chiqish() {
    localStorage.removeItem('user');
    this.kirganFoydalanuvchi.set(null);
    this.router.navigate(['/login']);
  }

  kirganmi() {
    return this.kirganFoydalanuvchi() !== null;
  }
}
