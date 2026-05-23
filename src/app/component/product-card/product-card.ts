import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink,Router } from '@angular/router';
import { Cart } from '../../services/cart';
import { Nav3 } from "../nav3/nav3";
import { Footer } from "../footer/footer";
import { FormsModule } from '@angular/forms';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { inject, signal } from '@angular/core';
import { CartService } from '../../services/project'; // تأكد من صحة المسار
@Component({
  selector: 'app-product-card',
  imports: [Nav3, Footer, FormsModule, RouterLink,TitleCasePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard implements OnInit {
 categoryName: string = '';
  products: any[] = [];
   private routere = inject(Router);
private cartService = inject(CartService);
  showHearts = signal(false);
  showMoney = signal(false);
  router = inject(Router);
  // تأكد أن لديك متغير يحتوي على بيانات المنتج في هذه الصفحة
  // product = signal<any>(null);
  constructor(
    private route: ActivatedRoute, // لقراءة المعاملات من الرابط
    private cart: Cart
  ) {}

  ngOnInit() {
    // 1. مراقبة الرابط للحصول على الـ slug (مثلاً: beauty)
    this.route.params.subscribe(params => {
      this.categoryName = params['slug'];
      this.loadProducts(this.categoryName);
    });
  }

  loadProducts(slug: string) {
    this.cart.getProductsByCategory(slug).subscribe({
      next: (data: any) => {
        this.products = data.products;
      },
      error: (err: any) => console.error(err)
    });
  }
onAddToCart(product: any) { 
  this.cartService.addToCart(product);
  this.showMoney.set(true);
  setTimeout(() => this.showMoney.set(false), 1000);
}

onAddToWishlist(product: any) {
  this.cartService.addToWishlist(product);
  this.showHearts.set(true);
  setTimeout(() => this.showHearts.set(false), 1000);
}
handleProtectedAction(actionType: string, product: any) {
  const token = localStorage.getItem('token');

  if (!token) {
    this.routere.navigate(['/login']);
  } else {
    if (actionType === 'favorite') {
      this.onAddToWishlist(product); // نمرر المنتج للدالة
    } else if (actionType === 'cart') {
      this.onAddToCart(product); // نمرر المنتج للدالة
    }
  }
}
}
