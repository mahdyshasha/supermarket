import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
cartItems = signal<any[]>([]);
  wishlistItems = signal<any[]>([]);
orders = signal<any[]>(this.loadOrders());

private loadOrders(): any[] {
    const saved = localStorage.getItem('my_orders');
    return saved ? JSON.parse(saved) : [];
  }


confirmAndPay() {
    if (this.cartItems().length === 0) return;

    const newOrder = {
      orderId: 'ORD-' + Math.floor(Math.random() * 100000),
      date: new Date().toLocaleString('ar-SA'),
      items: [...this.cartItems()], // نسخ المنتجات من السلة
      totalAmount: this.cartItems().reduce((acc, item) => acc + item.price, 0),
      status: 'تم الدفع'
    };

    // إضافة الطلب الجديد للمصفوفة
    this.orders.update(prev => {
      const updated = [newOrder, ...prev];
      localStorage.setItem('my_orders', JSON.stringify(updated)); // حفظ دائم
      return updated;
    });

    // 3. تفريغ السلة بعد نجاح "الدفع"
    this.cartItems.set([]);
  }










  
  addToCart(product: any) {
    this.cartItems.update(items => [...items, product]);
  }

  removeFromCart(id: number) {
    this.cartItems.update(items => items.filter(i => i.id !== id));
  }

  addToWishlist(product: any) {
    this.wishlistItems.update(items => {
      const exists = items.find(i => i.id === product.id);
      return exists ? items : [...items, product];
    });
  }

  removeFromWishlist(id: number) {
    this.wishlistItems.update(items => items.filter(i => i.id !== id));
  }





  private categoryImages: { [key: string]: string } = {
   // 1. الجمال
  'beauty': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
  // 2. العطور
  'fragrances': 'https://images.unsplash.com/photo-1592947945242-69312358628b?w=500&q=80',
  // 3. الأثاث
  'furniture': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
  // 4. البقالة
  'groceries': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80',
  // 5. ديكور المنزل
  'home-decoration': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500&q=80',
  // 6. أدوات المطبخ
  'kitchen-accessories': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=500&q=80',
  // 7. اللابتوبات
  'laptops': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
  // 8. قمصان رجالي
  'mens-shirts': 'https://media.istockphoto.com/id/1034283778/photo/smiling-young-casual-man-holding-a-tablet.jpg?s=612x612&w=0&k=20&c=3pQ5uJbv4OQx0FDLfHYauMbfolXk0ojFMf55GfwkJxU=',
  // 9. أحذية رجالي
  'mens-shoes': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&q=80',
  // 10. ساعات رجالي
  'mens-watches': 'https://media.istockphoto.com/id/1135934992/photo/young-man-checking-time-on-his-elegant-wristwatch.jpg?s=612x612&w=0&k=20&c=H0NAsyS86kUzeTB9-xD0ZQlwZ033lOQipB7XCyvPRi4=',
  // 11. إكسسوارات الموبايل
  'mobile-accessories': 'https://t3.ftcdn.net/jpg/03/31/29/00/360_F_331290098_Pzxh1L9sjCAzgDVXmycxyZHZ0hCFMfFb.jpg',
  // 12. دراجات نارية
  'motorcycle': 'https://i.pinimg.com/originals/4f/eb/92/4feb92bc6ce86848fdc997b4ef93683e.jpg',
  // 13. منتجات العناية بالبشرة
  'skin-care': 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=80',
  // 14. الهواتف الذكية
  'smartphones': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
  // 15. أجهزة رياضية
  'sports-accessories': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80',
  // 16. نظارات شمسية
  'sunglasses': 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
  // 17. أجهزة تابلت
  'tablets': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80',
  // 18. بلايز نسائية
  'tops': 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&q=80',
  // 19. سيارات
  'vehicle': 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&q=80',
  // 20. حقائب نسائية
  'womens-bags': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80',
  // 21. فساتين نسائية
  'womens-dresses': 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=500&q=80',
  // 22. مجوهرات نسائية
  'womens-jewellery': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80',
  // 23. أحذية نسائية
  'womens-shoes': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80',
  // 24. ساعات نسائية
  'womens-watches': 'https://t3.ftcdn.net/jpg/07/45/43/34/360_F_745433451_oghymUJTDezu6tT1PeCq53vGeyEENxHx.jpg',

  'default': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'
  };

  getCategoryImage(slug: string): string {
    return this.categoryImages[slug] || this.categoryImages['default'];
  }
}