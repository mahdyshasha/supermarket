// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = localStorage.getItem('token');
    if (user) {
      // إذا فيه بيانات مستخدم، اسمح بالدخول
      return true;
    } else {
      // إذا لا، حوله لصفحة تسجيل الدخول
      this.router.navigate(['/login']);
      return false;
    }
  }
}