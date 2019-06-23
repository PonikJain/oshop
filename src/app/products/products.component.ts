import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products : Product[] =[];
  filteredProducts : Product[];

  categories$;

  category;

  subscription:Subscription;  

  constructor(
    private productService : ProductService,
    private categoryService : CategoryService,
    route:ActivatedRoute) {

      //here instead of using 2 subscribe method nested we used swicthMap to switch control from
      //one observable to another
    this.subscription = productService.getAll().switchMap(products => {
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
