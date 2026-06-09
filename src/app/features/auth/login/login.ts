import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  forma: FormGroup;
  xato = '';

  constructor(
    private fb: FormBuilder,
    private authServise: AuthService,
    private router: Router,
  ) {
    this.forma = this.fb.group({
      email: ['', Validators.required],
      sir: ['', Validators.required],
    });
  }

  kirish() {
    if (this.forma.valid) {
      const { email, sir } = this.forma.value;
      this.authServise.kirish(email, sir).subscribe((users) => {
        if (users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0]));
          this.authServise.kirganFoydalanuvchi.set(users[0]);
          this.router.navigate(['/']);
        } else {
          this.xato = "Email yoki sir noto'g'ri!";
        }
      });
    }
  }
}
