import { Component } from '@angular/core';
import { Nav2 } from "../nav2/nav2";
import { Footer } from "../footer/footer";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-log-in',
  imports: [Nav2, Footer, ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
})
export class LogIn {
 
 registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      agree: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      alert('يرجى تعبئة جميع الحقول بشكل صحيح');
      return;
    }

    const { password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      alert('كلمة المرور غير متطابقة');
      return;
    }
const userData = {
   firstName: this.registerForm.value.firstName,
    lastName: this.registerForm.value.lastName,
     email: this.registerForm.value.email,
      password: this.registerForm.value.password 
    };
localStorage.setItem('userData', JSON.stringify(userData)); 
localStorage.setItem('token', 'fake-token'); 
alert('تم التسجيل بنجاح!');
 this.registerForm.reset();
  this.router.navigate(['/']);
  
  }
}
