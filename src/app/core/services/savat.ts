import { Injectable, signal, computed } from '@angular/core';
import { Mahsulot } from '../models/mahsulot.model';

@Injectable({
  providedIn: 'root',
})
export class SavatService {
  savatMahsulotlar = signal<{ mahsulot: Mahsulot; miqdori: number }[]>([]);

  jami = computed(() =>
    this.savatMahsulotlar().reduce((sum, item) => sum + item.mahsulot.narxi * item.miqdori, 0),
  );

  savatdagiMiqdor = computed(() =>
    this.savatMahsulotlar().reduce((sum, item) => sum + item.miqdori, 0),
  );

  qoshish(mahsulot: Mahsulot) {
    const bor = this.savatMahsulotlar().find((item) => item.mahsulot.id === mahsulot.id);

    if (bor) {
      this.savatMahsulotlar.update((items) =>
        items.map((item) =>
          item.mahsulot.id === mahsulot.id ? { ...item, miqdori: item.miqdori + 1 } : item,
        ),
      );
    } else {
      this.savatMahsulotlar.update((items) => [...items, { mahsulot, miqdori: 1 }]);
    }
  }

  kamaytirish(mahsulotId: number) {
    const bor = this.savatMahsulotlar().find((item) => item.mahsulot.id === mahsulotId);

    if (bor && bor.miqdori === 1) {
      this.ochirish(mahsulotId);
    } else {
      this.savatMahsulotlar.update((items) =>
        items.map((item) =>
          item.mahsulot.id === mahsulotId ? { ...item, miqdori: item.miqdori - 1 } : item,
        ),
      );
    }
  }

  ochirish(mahsulotId: number) {
    this.savatMahsulotlar.update((items) =>
      items.filter((item) => item.mahsulot.id !== mahsulotId),
    );
  }

  tozalash() {
    this.savatMahsulotlar.set([]);
  }
}
