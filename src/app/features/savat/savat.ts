import { Component } from '@angular/core';
import { SavatService } from '../../core/services/savat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-savat',
  imports: [],
  templateUrl: './savat.html',
  styleUrl: './savat.css',
})
export class Savat {
  constructor(
    public savatService: SavatService,
    private router: Router,
  ) {}

  buyurtmaQilish() {
    this.router.navigate(['/buyurtma']);
  }
}
