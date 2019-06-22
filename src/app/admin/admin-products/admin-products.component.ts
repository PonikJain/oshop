import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from 'src/app/models/product';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy,AfterViewInit{

  products : Product[];

  subscription : Subscription;

  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<Product> = new Subject();

  ngAfterViewInit(): void {
  // Calling the DT trigger to manually render the table
    this.dtTrigger.next();
  }

  constructor(private productService: ProductService) { 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing:true,
    };

        this.subscription = productService.getAll().subscribe(results => 
          {
            this.products = results;
          }); 
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
