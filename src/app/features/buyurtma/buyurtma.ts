import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SavatService } from '../../core/services/savat';
import { AuthService } from '../../core/services/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyurtma',
  imports: [ReactiveFormsModule],
  templateUrl: './buyurtma.html',
  styleUrl: './buyurtma.css',
})
export class Buyurtma {
  forma: FormGroup;
  yuborildi = false;

  constructor(
    private fb: FormBuilder,
    public savatService: SavatService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
  ) {
    this.forma = this.fb.group({
      ism: ['', Validators.required],
      telefon: ['', [Validators.required, Validators.minLength(9)]],
      manzil: ['', Validators.required],
    });
  }

  buyurtmaQilish() {
    if (this.forma.valid) {
      const buyurtma = {
        foydalanuvchi: this.authService.kirganFoydalanuvchi(),
        mahsulotlar: this.savatService.savatMahsulotlar(),
        jami: this.savatService.jami(),
        manzil: this.forma.value,
        sana: new Date().toLocaleDateString('uz-UZ'),
      };

      this.http.post('http://localhost:3000/buyurtmalar', buyurtma).subscribe({
        next: () => {
          this.savatService.tozalash();
          this.yuborildi = true;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
      });
    }
  }
}
