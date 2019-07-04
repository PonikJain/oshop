import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart{
    items : ShoppingCartItem[] = [];

    constructor(private itemsMap : {[productId:string]: ShoppingCartItem}){
      this.itemsMap = itemsMap || {};
      for(let productId in itemsMap){
         let item = itemsMap[productId];
         this.items.push(new ShoppingCartItem(item.product,item.quantity));
      }
    }

    getQuantity(product: Product) { 
      let item = this.itemsMap[product.key];
      return item ? item.quantity : 0;
    }

    get totalItemCount() : number{
        let shoppingCartItemCount = 0;
        for(let productId in this.itemsMap){
          shoppingCartItemCount += this.itemsMap[productId].quantity;
        }
        return shoppingCartItemCount;
    }

    get totalPrice() : number{
      let sum =0;
      for(let productId in this.items){
        let item = this.items[productId];
        sum += item.totalPrice;
      }
      return sum;
    }

}