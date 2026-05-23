import { RouterModule, Routes } from '@angular/router';

import { Navbar } from './component/navbar/navbar';
import { Footer } from './component/footer/footer';
import { Lading } from './component/lading/lading';
import { Nav2 } from './component/nav2/nav2';
import { Regster } from './component/regster/regster';
import { LogIn } from './component/log-in/log-in';
import { NgModule } from '@angular/core';
import { Nav3 } from './component/nav3/nav3';     
import { ProductCard } from './component/product-card/product-card';
import { ProductDetail } from './component/product-detail/product-detail';
import { Favorit } from './component/favorit/favorit';
import { Box } from './component/box/box';
import { CheckoutComponent } from './component/checkout-page/checkout-page';
import { Fault } from './component/fault/fault';
import { AuthGuard } from './guards/auth-guard';
import { ProductList } from './component/product-list/product-list';
import { Map } from './component/map/map';


export const routes: Routes = [
 
  { path: '', component: Lading, pathMatch: 'full' },
  {path:'register',component:Regster,},
  {path:'login',component:LogIn,},
  { path: 'category/:slug', component: ProductCard } ,
{ path: 'ProductDetail/:id', component: ProductDetail } ,
{ path: 'favor', component: Favorit, canActivate: [AuthGuard] } ,
{ path: 'box', component: Box, canActivate: [AuthGuard] } ,
{ path: 'CheckoutComponent', component: CheckoutComponent } ,
{ path: 'fault', component: Fault } ,
{ path: 'ProductList', component: ProductList } ,
{ path: 'map', component: Map } ,


];
                                        

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

