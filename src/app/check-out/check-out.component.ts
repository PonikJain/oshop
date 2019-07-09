import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscriber, Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit ,OnDestroy{

  shipping = {name :"",add1:"",add2:"",city:""};  
  cart : ShoppingCart;
  userId ; string;

  cSubscription : Subscription;
  aSubscription : Subscription;

  constructor(private router : Router,
    private shoppingCartService : ShoppingCartService,
    private orderService : OrderService,
    private authService : AuthService) { }

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    let cart$$= cart$.map(c => new ShoppingCart(c.items as any));
    this.cSubscription = cart$$.subscribe(cart => this.cart= cart);
    this.aSubscription = this.authService.user$.subscribe(user$ =>this.userId = user$.uid);
  }
  
  ngOnDestroy(){
    this.cSubscription.unsubscribe();
    this.aSubscription.unsubscribe();
  }

  async placeOrder() {
    let itemsArray : ShoppingCartItem[]= Object.keys(this.cart.items).map(productKey => this.cart.items[productKey]);
    
    let products = itemsArray.map(i =>{
      return {
        product : {
           title :i.product.title,
           imageUrl:i.product.imageUrl,
           price : i.product.price
          },
        quantity : i.quantity,
        totalPrice : i.product.price*i.quantity,
        }
    });

    let order ={
      userId : this.userId,
      datePlaced : new Date().getTime(),
      shipping : this.shipping,
      items : products
    }

    let result = await this.orderService.storeOrder(order);
    this.shoppingCartService.clearCart();
    this.router.navigate(['order-success',result.key]);
  }    

  navigateToCart(){
    this.router.navigate(['/shopping-cart']);
  }
}
