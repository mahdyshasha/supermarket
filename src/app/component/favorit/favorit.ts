import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/project';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router'
@Component({
  selector: 'app-box',
  imports: [RouterLink],
  templateUrl: './favorit.html',
  styleUrl: './favorit.css',
})
export class Favorit {
private cartService = inject(CartService);

wishlistItems = this.cartService.wishlistItems;

  // تعريف الدالة لكي يراها الـ HTML
  removeFromWishlist(id: number) {
    this.cartService.removeFromWishlist(id);
  }
  cartItems = this.cartService.cartItems;

  // حساب المجموع الإجمالي تلقائياً باستخدام computed
  totalPrice = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.price, 0);
  });

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  checkout() {
    alert('سيتم توجيهك لصفحة الدفع.. المجموع: $' + this.totalPrice());
  }
}
