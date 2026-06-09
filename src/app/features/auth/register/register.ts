import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  forma: FormGroup;
  xato = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.forma = this.fb.group(
      {
        ism: ['', Validators.required],
        email: ['', [Validators.required]],
        sir: ['', [Validators.required, Validators.minLength(4)]],
        sirTasdiq: ['', Validators.required],
      },
      { validators: this.sirlarMosmi },
    );
  }

  sirlarMosmi(forma: any) {
    const sir = forma.get('sir')?.value;
    const sirTasdiq = forma.get('sirTasdiq')?.value;
    return sir === sirTasdiq ? null : { sirlarMosEmas: true };
  }
  royxatdanOt() {
    if (this.forma.valid) {
      const { ism, email, sir } = this.forma.value;
      this.http.post('http://localhost:3000/users', { ism, email, sir }).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: () => {
          this.xato = "Ro'yxatdan o'tishda xato!";
        },
      });
    }
  }
}
