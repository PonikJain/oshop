import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser : AppUser;

  cart$ : Observable<ShoppingCart>;

  async ngOnInit() {
    this.authService.appUser$.subscribe(user => this.appUser = user);
    let cart = await this.cartService.getCart();
    this.cart$ = cart.map(c => new ShoppingCart(c.items as any));
  }

  constructor(private authService : AuthService,private cartService : ShoppingCartService) { 
   
  }

  logout(){
    this.authService.logout();
  } 


}
