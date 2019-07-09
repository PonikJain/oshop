import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import { map } from 'rxjs-compat/operator/map';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db : AngularFireDatabase) {

   }

   create(){
    return this.db.list('/shopping-carts').push({
       dateCreated : new Date().getTime()
     });
   }

   private async getOrCreateId() : Promise<string>{ 
    let cartId = localStorage.getItem('cartId');
    if(cartId) return cartId;

      let result = await this.create();
      localStorage.setItem('cartId',result.key);
      return result.key;
   }

   async getCart(){
    let cartId = await this.getOrCreateId();
    let cart = this.db.object<ShoppingCart>('/shopping-carts/'+cartId).snapshotChanges().map(cart => ({key:cart.payload.key,...cart.payload.val()}) );
     return cart;
  }

  async clearCart() {
    let cardId = await this.getOrCreateId();
    this.db.object('/shopping-carts/'+cardId+'/items').remove();
  }

   private getItem(cartId:string,productKey :string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productKey);
   }

   async addToCart(product : Product){
    this.updateProductQuantity(product,1);
   }

   async removeFromCart(product: Product) {
    this.updateProductQuantity(product,-1);
  }

  private async updateProductQuantity(product :Product,change:number){
    let cartId = await this.getOrCreateId();
    let item$ = this.getItem(cartId,product.key);

    item$.valueChanges().take(1).subscribe( (item:any) => {

       if( item === null ) {
          item$.set({product: product, quantity: 1});
      }else{
         let quantity = (item.quantity || 0)+change;
          if
          (quantity === 0) item$.remove();
          else
          item$.update({quantity: item.quantity + change});
     }
    });
  }
}
