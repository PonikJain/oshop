import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy{

  products : Product[] =[];
  filteredProducts : Product[];

  categories$;

  category;

  cart$ : Observable<ShoppingCart>; 

  psubscription:Subscription; 

  async ngOnInit() {
    let cart = await this.shopingCartService.getCart();

    this.cart$ = cart.map(c => new ShoppingCart(c.items as any));
  }

  ngOnDestroy(): void {
    this.psubscription.unsubscribe();
  }

  constructor(
    private productService : ProductService,
    private categoryService : CategoryService,
    private shopingCartService : ShoppingCartService,
    route:ActivatedRoute) {

      //here instead of using 2 subscribe method nested we used swicthMap to switch control from
      //one observable to another
    this.psubscription = productService.getAll().switchMap(products => {
      this.products = products
      return route.queryParams;
    }).subscribe(params => {
      //this block should be exected oncec we get product
        this.category = params['category'];
        this.filteredProducts = (this.category) ? this.products.filter(p=>p.category === this.category) : this.products;
    });

    this.categories$ = categoryService.getAll();
   }


}
