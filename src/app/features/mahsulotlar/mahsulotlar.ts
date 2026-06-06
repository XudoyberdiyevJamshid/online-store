import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { MahsulotService } from '../../core/services/mahsulot';
import { SavatService } from '../../core/services/savat';
import { Router } from '@angular/router';
import { Mahsulot } from '../../core/models/mahsulot.model';
import { Loading } from '../../shared/components/loading/loading';
import { MahsulotCard } from '../../shared/components/mahsulot-card/mahsulot-card';

@Component({
  selector: 'app-mahsulotlar',
  imports: [Loading, MahsulotCard, ReactiveFormsModule, FormsModule],
  templateUrl: './mahsulotlar.html',
  styleUrl: './mahsulotlar.css',
})
export class Mahsulotlar {
  qidiruv = '';

  constructor(
    public mahsulotService: MahsulotService,
    private savatService: SavatService,
    private router: Router,
  ) {}

  qidirish() {
    if (this.qidiruv.trim() === '') {
      this.mahsulotService.hammaMahsulotlarniOl();
    } else {
      this.mahsulotService.qidirish(this.qidiruv).subscribe((data) => {
        this.mahsulotService.mahsulotlar.set(data);
      });
    }
  }

  savatgaQosh(mahsulot: Mahsulot) {
    this.savatService.qoshish(mahsulot);
  }

  detailKor(id: number) {
    this.router.navigate(['/mahsulot', id]);
  }
}
