import { Injectable, signal } from '@angular/core';
import { Mahsulot } from '../models/mahsulot.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MahsulotService {
  private url = 'http://localhost:3000/mahsulotlar';
  mahsulotlar = signal<Mahsulot[]>([]);
  yuklanyapti = signal<boolean>(false);
  xato = signal<string>('');

  constructor(private http: HttpClient) {}

  hammaMahsulotlarniOl() {
    this.yuklanyapti.set(true);
    this.http.get<Mahsulot[]>(this.url).subscribe({
      next: (data) => {
        this.mahsulotlar.set(data);
        this.yuklanyapti.set(false);
      },
      error: (xato) => {
        this.xato.set('Mahsulotlarni yuklashda xato!');
        this.yuklanyapti.set(false);
      },
    });
  }

  mahsulotniOl(id: number) {
    return this.http.get<Mahsulot>(`${this.url}/${id}`);
  }
  qidirish(matn: string) {
    return this.http.get<Mahsulot[]>(`${this.url}?nomi_like=${matn}`);
  }
  kategoriyaFilter(kategoriya: string) {
    return this.http.get<Mahsulot[]>(`${this.url}?kategoriya=${kategoriya}`);
  }
}
