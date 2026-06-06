import { Component, OnInit, signal } from '@angular/core';
import { Mahsulot } from '../../core/models/mahsulot.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MahsulotService } from '../../core/services/mahsulot';
import { SavatService } from '../../core/services/savat';

@Component({
  selector: 'app-mahsulot-detail',
  imports: [],
  templateUrl: './mahsulot-detail.html',
  styleUrl: './mahsulot-detail.css',
})
export class MahsulotDetail implements OnInit {
  mahsulot = signal<Mahsulot | null>(null);
  yuklanyapti = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mahsulotService: MahsulotService,
    private savatService: SavatService,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mahsulotService.mahsulotniOl(id).subscribe({
      next: (data) => {
        this.mahsulot.set(data);
        this.yuklanyapti.set(false);
      },
      error: () => {
        this.router.navigate(['/']);
      },
    });
  }

  savatgaQosh() {
    if (this.mahsulot()) {
      this.savatService.qoshish(this.mahsulot()!);
      this.router.navigate(['/savat']);
    }
  }

  ortgaQayt() {
    this.router.navigate(['/']);
  }
}
