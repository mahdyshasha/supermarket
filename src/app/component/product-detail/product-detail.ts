import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/project';
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private routere = inject(Router);
  private http = inject(HttpClient);
  private cartService = inject(CartService);
  minPrice = 0;
  maxPrice = 2000;
  allRelatedProducts: any[] = []; // نسخة أصلية للمنتجات بدون فلترة
  product = signal<any>(null);
  relatedProducts = signal<any[]>([]);
  currentImgIndex = signal<number>(0);
  priceFilter = signal<number>(1000);
  router: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadProductDetails(id);
        this.currentImgIndex.set(0); 
      }
    });
  }
  loadProductDetails(id: string) {
    this.http.get(`https://dummyjson.com/products/${id}`).subscribe((data: any) => {
      this.product.set(data);
      this.loadRelatedProducts(data.category);
    });
  }
 loadRelatedProducts(category: string) {
  this.http.get(`https://dummyjson.com/products/category/${category}`).subscribe((res: any) => {
    const data = res.products.filter((p: any) => p.id !== this.product().id);
    this.allRelatedProducts = data; 
    this.relatedProducts.set(data); 
  });
}
  nextImage() {
    const images = this.product().images;
    if (images) {
      this.currentImgIndex.update(i => (i + 1) % images.length);
    }
  }
  prevImage() {
    const images = this.product().images;
    if (images) {
      this.currentImgIndex.update(i => (i - 1 + images.length) % images.length);
    }
  }
  updatePrice(event: any) {
    this.priceFilter.set(event.target.value);
  }
applyFilters() {

  const filtered = this.allRelatedProducts.filter(p => 
    p.price >= this.minPrice && p.price <= this.maxPrice
  );
  this.relatedProducts.set(filtered);
}
 // داخل ملف الـ TS الخاص بصفحة المنتج
showHearts = signal(false);
showMoney = signal(false);

onAddToCart() {
  this.cartService.addToCart(this.product());
  this.showMoney.set(true);
  setTimeout(() => this.showMoney.set(false), 1000); // تختفي بعد ثانية
}

onAddToWishlist() {
  this.cartService.addToWishlist(this.product());
  this.showHearts.set(true);
  setTimeout(() => this.showHearts.set(false), 1000);
}
handleProtectedAction(actionType: string) {
    const token = localStorage.getItem('token'); // أو أي وسيلة تستخدمها للتأكد من الدخول

    if (!token) {
      
      this.routere.navigate(['/login']);
    } else {
     
      if (actionType === 'favorite') {
        this.onAddToWishlist();
      } else if (actionType === 'cart') {
        this.onAddToCart();
      }
    }
  }

}