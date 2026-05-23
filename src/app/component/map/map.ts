import { Component, inject } from '@angular/core';
import { Nav2 } from "../nav2/nav2";
import { Footer } from "../footer/footer";
import { ActivatedRoute,RouterLink } from '@angular/router';
import { Cart } from '../../services/cart';
import { Nav3 } from "../nav3/nav3";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  imports: [Nav2, Footer, Nav3,RouterLink],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class Map {
private sanitizer = inject(DomSanitizer);

  // الخطأ كان هنا: يجب تعريف المتغير ليعرفه الأنجولار
  activeBranchId: number | null = null; 

  // الرابط الأولي للخريطة (يفضل وضع رابط فرعك الرئيسي)
  currentMapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.852353063539!2d36.2573!3d33.513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDMwJzQ2LjgiTiAzNsKwMTUnMjYuMyJF!5e0!3m2!1sar!2ssy!4v1625000000000!5m2!1sar!2ssy'
  );
branches = [
  { 
    id: 1, 
    name: 'فرع دمشق - المزة', 
    address: 'ابن المقفع، المزة، دمشق ', 
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.465134676527!2d36.2483842!3d33.5152862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518dfb4d6b19e37%3A0x648d9aa9fab494a2!2z2YXYt9i52YUg2YjYsdivINin2YTYtNin2YU!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s' 
  },
  { 
    id: 2, 
    name: 'فرع طرطوس - الكورنيش', 
    address: 'الكورنيش البحري، طرطوسط', 
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.026402517812!2d35.8732127!3d34.8932642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15217f7a32267f77%3A0x9c79364e4ee69019!2z2KfZhNmD2YjYsdmG2YrYtCDYp9mE2KjYrdix2Yo!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s' 
  },
  { 
    id: 3, 
    name: 'فرع حلب - الشهباء', 
    address: 'حي الشهباء، حلب ', 
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.787652254131!2d37.1264321!3d36.2141523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152ff3b2ad41133d%3A0xc9912429492a9049!2z2YXYt9i52YUg2LHYp9is2LnZitmG!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s' 
  }
];

  updateMap(url: string, id: number) {
    this.activeBranchId = id; // الآن سيعمل السطر بدون أخطاء
    this.currentMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  }


