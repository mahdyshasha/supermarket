import { Component, inject, computed, signal,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/project';
import { Router,RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckoutComponent {
  [x: string]: any;
 private cartService = inject(CartService);
  private router = inject(Router);
  cartItems = this.cartService.cartItems;
  totalPrice = computed(() => this.cartItems().reduce((acc, item) => acc + item.price, 0));

  // التحكم في حالة الطلب
  isOrderPlaced = signal(false);

  onPlaceOrder() {
    this.isOrderPlaced.set(true);
this.cartService.confirmAndPay();
  alert('تم تأكيد دفع طلبك بنجاح وحفظه في قائمة طلباتي');
  this.router.navigate(['/productlist']);
    setTimeout(() => {
        this.cartService.cartItems.set([]); 
    }, 1000);
  }
  math = Math; 
  
  
  orderNumber = Math.floor(Math.random() * 1000000);
}