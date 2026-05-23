import { inject, Injectable } from '@angular/core';
import { CartService } from './project';

@Injectable({
  providedIn: 'root'
})
export class Order {
private cartService = inject(CartService);
  myOrders = this.cartService.orders;
}
