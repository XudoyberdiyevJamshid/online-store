import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  kirish(email: string, parol: string) {
    return this.http.get<User[]>(`${this.url}?email=${email}&parol=${parol}`);
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
