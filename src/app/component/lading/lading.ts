import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { Nav2 } from "../nav2/nav2";
import { provideHttpClient } from '@angular/common/http';
import { Nav3 } from "../nav3/nav3";

@Component({
  selector: 'app-lading',
  imports: [Navbar, Footer, Nav2, Nav3],
  templateUrl: './lading.html',
  styleUrl: './lading.css',
})
export class Lading {

}
