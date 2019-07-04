import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_BOOTSTRAP_LISTENER } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule} from 'ng2-validation';

/*This Module is replacement of the JQuery as For Bootstrap event to work jquery is required and to remove jquery 
layer beween angular and DOM this module has been provided */
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import {UserService} from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';

import { DataTablesModule } from 'angular-datatables';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductCardComponent,
    ProductFilterComponent,
    ProductQuantityComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    CustomFormsModule,
    DataTablesModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component : ProductsComponent},
      {path: 'products', component : ProductsComponent},
      {path: 'my/orders',component : MyOrdersComponent},
      {path: 'shopping-cart', component : ShoppingCartComponent},
      {path: 'check-out', component : CheckOutComponent , canActivate : [AuthGuardService]},
      {path: 'order-success' ,component: OrderSuccessComponent },
      {path: 'login' ,component: LoginComponent },
      //Most specific route should on top and generic at bottom
      {path: 'admin/products/new' ,component: ProductFormComponent ,canActivate : [AdminAuthGuard]},
      {path: 'admin/products/:id' ,component: ProductFormComponent ,canActivate : [AdminAuthGuard]},
      {path: 'admin/products' ,component: AdminProductsComponent ,canActivate : [AdminAuthGuard]},
      {path: 'admin/orders' ,component: AdminOrdersComponent },
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
