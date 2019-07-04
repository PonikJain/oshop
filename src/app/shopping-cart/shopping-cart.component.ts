import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$ : Observable<ShoppingCart> ;

  constructor(private cartService : ShoppingCartService) { }

  async ngOnInit() {
   let cart = await this.cartService.getCart();
   this.cart$ = cart.map(c => new ShoppingCart(c.items as any));
  }

  clearCart(){
    console.log('clear cart');
    this.cartService.clearCart();
  }
  
}
