import { Component, OnInit, inject } from '@angular/core';
import { Cart } from '../../services/cart'; 
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router'; // أضفنا Router للتوجيه
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import{ CartService } from '../../services/project';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule, MatMenuModule, MatButtonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  foods: any[] = []; 
  showError = false;
  constructor(private cart: Cart, private router: Router, private cartService: CartService) {}
  
  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    this.cart.getFoods().subscribe({
      next: (data: any) => {
        this.foods = data; 
        console.log('الفئات المحملة:', this.foods);
      },
      error: (err) => console.error('خطأ في تحميل الفئات:', err)
    });
  }

  searchCategory(value: string) {
    const searchTerm = value.trim().toLowerCase();

    if (!searchTerm) {
      this.showError = false;
      return;
    }
    const foundCategory = this.foods.find(cat => 
      cat.name.toLowerCase() === searchTerm || 
      cat.slug.toLowerCase() === searchTerm
    );

    if (foundCategory) {
      this.showError = false;
      console.log('تم العثور على الفئة، جاري التوجيه:', foundCategory.slug);
      this.router.navigate(['/category', foundCategory.slug]);
    } else {
      this.showError = true; 
    }
  }
  onInputChange() {
    if (this.showError) this.showError = false;
  }


// دالة لجلب الصورة من الخدمة
getImg(slug: string) {
  return this.cartService.getCategoryImage(slug);
}
}