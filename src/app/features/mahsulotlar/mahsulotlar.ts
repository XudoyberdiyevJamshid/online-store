import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { MahsulotService } from '../../core/services/mahsulot';
import { SavatService } from '../../core/services/savat';
import { Router } from '@angular/router';
import { Mahsulot } from '../../core/models/mahsulot.model';
import { Loading } from '../../shared/components/loading/loading';
import { MahsulotCard } from '../../shared/components/mahsulot-card/mahsulot-card';

@Component({
  selector: 'app-mahsulotlar',
  imports: [Loading, MahsulotCard, ReactiveFormsModule],
  templateUrl: './mahsulotlar.html',
  styleUrl: './mahsulotlar.css',
})
export class Mahsulotlar implements OnInit, OnDestroy {
  qidiruv = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(
    public mahsulotService: MahsulotService,
    private savatService: SavatService,
    private router: Router,
  ) {}

  ngOnInit() {
    const oqim = this.qidiruv.valueChanges;
    console.log('Oqim:', oqim);
    oqim
      .pipe(
        debounceTime(300),
        switchMap((qiymat) => {
          console.log("So'rov ketdi:", qiymat);
          return this.mahsulotService.qidirish(qiymat || '');
        }),
      )
      .subscribe((data) => {
        console.log('Natija:', data);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  savatgaQosh(mahsulot: Mahsulot) {
    this.savatService.qoshish(mahsulot);
  }

  detailKor(id: number) {
    this.router.navigate(['/mahsulot', id]);
  }
}
