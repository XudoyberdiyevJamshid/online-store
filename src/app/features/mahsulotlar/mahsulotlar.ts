import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { MahsulotService } from '../../core/services/mahsulot';
import { SavatService } from '../../core/services/savat';
import { Router } from '@angular/router';
import { Mahsulot } from '../../core/models/mahsulot.model';

@Component({
  selector: 'app-mahsulotlar',
  imports: [],
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
