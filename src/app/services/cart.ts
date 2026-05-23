import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class Cart {
 private apiUrl = 'https://dummyjson.com/products/categories'; 
  constructor(private http: HttpClient) {}
 getFoods(): Observable<any[]> {
  return this.http.get<any[]>(`https://dummyjson.com/products/categories`);
}
getProductsByCategory(categorySlug: string): Observable<any> {
  return this.http.get<any>(`https://dummyjson.com/products/category/${categorySlug}`);
}

}
