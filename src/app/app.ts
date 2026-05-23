import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from "./component/navbar/navbar";
import { Footer } from "./component/footer/footer";

import { LogIn } from "./component/log-in/log-in";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLinkWithHref, Navbar, Footer, LogIn],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('first_app');

// showuser=false;
// showadmin=false;

 


 
}
