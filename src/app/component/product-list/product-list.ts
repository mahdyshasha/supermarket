import { Component, inject } from '@angular/core';
import { CartService } from '../../services/project';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {

  private cartService = inject(CartService);
  myOrders = this.cartService.orders;
}
