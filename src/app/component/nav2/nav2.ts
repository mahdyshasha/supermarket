import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterModule,RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common'; // مهم جداً لاستخدام الشرط @if
import { CartService } from '../../services/project';
import * as emailjs from '@emailjs/browser';
@Component({
  selector: 'app-nav2',
  standalone: true,
  // أضفنا موديولات الماتيريال هنا لتعمل في الـ HTML
  imports: [RouterModule, MatButtonModule, MatIconModule, MatMenuModule, CommonModule,RouterLink],
  templateUrl: './nav2.html',
  styleUrl: './nav2.css',
})
export class Nav2 implements OnInit {
  private router = inject(Router);
   private cartService = inject(CartService);
  displayName: string | null = null;
  isModalOpen: boolean = false;

  ngOnInit(): void {
    this.checkUser();
  }

  // دالة لفحص حالة المستخدم عند التشغيل
  checkUser(): void {
    const token = localStorage.getItem('token');
    const userDataString = localStorage.getItem('userData');
    if (token && userDataString) {
      const userData = JSON.parse(userDataString);
      this.displayName = userData.firstName;
    } else {
      this.displayName = null;
    }
  }

  openRegisterModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeRegisterModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  logout() {
    if (confirm("هل أنت متأكد من تسجيل الخروج؟")) {
      localStorage.clear();
      this.displayName = null;
      this.router.navigate(['/login']);
      console.log('تم تسجيل الخروج بنجاح');
    }
  }
  wishlistCount = computed(() => this.cartService.wishlistItems().length);
  cartCount = computed(() => this.cartService.cartItems().length);


  // أضف هذا المتغير
shasha = false;

openContactModal() {
  this.shasha = true;
}

closeContactModal() {
  this.shasha = false;
}



}
