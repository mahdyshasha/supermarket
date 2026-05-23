import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/project';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild, TemplateRef } from '@angular/core'; // أضف ViewChild و TemplateRef
import {  MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-box',
  imports: [MatDialogModule, MatButtonModule, RouterLink ],
  templateUrl: './box.html',
  styleUrl: './box.css',
})
export class Box {
   @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  constructor(private dialog: MatDialog, private router: Router) {}
private cartService = inject(CartService);
  cartItems = this.cartService.cartItems;
  totalPrice = computed(() => {
    return this.cartItems().reduce((acc, item) => acc + item.price, 0);
  });
  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }
  checkout() {
    const dialogRef = this.dialog.open(this.confirmDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result) {
        this.completePayment();
      }
    });
  }
  completePayment() {
    console.log('جاري التحويل...');
    this.router.navigate(['/CheckoutComponent']); 
  }
}
