import { Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router'; // أضفنا Router للتوجيه
import {LogIn } from'../log-in/log-in'
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common'; // مهم جداً لاستخدام الشرط @if
import { CartService } from '../../services/project';
@Component({
  selector: 'app-nav3',
  imports: [RouterModule, LogIn, MatIconModule, MatMenuModule, CommonModule,RouterLink],
  templateUrl: './nav3.html',
  styleUrl: './nav3.css',
})
export class Nav3 implements OnInit {
   private router = inject(Router);
    private cartService = inject(CartService);
  displayName: string | null = null;
  isModalOpen: boolean = false;

  ngOnInit(): void {
    this.checkUser();
  }


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

      }



