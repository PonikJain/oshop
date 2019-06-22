import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
// this take operator is used to take only one value from observalable and unsubscribe it later on Else another
//approch is to implement onDestroy Interface and destroy the subscription.
import 'rxjs/add/operator/take';
import { Product } from 'src/app/models/product';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories$ ;

  product$:Product = {title:"",price:"",category:"",imageUrl:""} ;

  id;

  constructor(private categoryService : CategoryService, 
              private productService : ProductService,
              private router : Router,
              private route : ActivatedRoute) { 
  
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id){
      this.productService.getProduct(this.id).take(1).subscribe(p => this.product$=p);
    }
  }

  save(product){
    if(this.id){
      this.productService.update(this.id,product);
    }else{
      this.productService.save(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(!confirm("Are you sure want to delete this ?")) return ;

    this.productService.delete(this.id); 
    this.router.navigate(['/admin/products']);
  }

  navigateAdminProducts(){
    this.router.navigate(['/admin/products']);
  }


}
