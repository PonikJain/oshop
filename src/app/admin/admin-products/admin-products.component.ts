import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'src/app/models/product';
import { DataTableModule } from 'angular-6-datatable';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{

  products : Product[];

  filteredProducts : Product[];

  subscription : Subscription;

  itemCount: number;

  constructor(private productService: ProductService) { 
     this.subscription = productService.getAll().subscribe(results => 
      {
        this.filteredProducts = this.products = results;
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query:string){
   if(query){ 
    this.filteredProducts = this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
    }else{
      this.filteredProducts = this.products;
    }
  }

}
