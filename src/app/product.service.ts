import { Injectable } from '@angular/core';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db : AngularFireDatabase) { }

  save(product ){
    return this.db.list("/products").push(product);
  }

  getAll(){
    let list  : AngularFireList<any> = this.db.list('/products');
    return list.snapshotChanges().map(changes => {
      return changes.map((c) => {
        return { key: c.payload.key, ...c.payload.val() };
      }
      );
    });
  }

  getProduct(productId) : Observable<any>{
   return this.db.object('/products/'+productId).valueChanges();
  }

  update(productId,product){
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId){
     this.db.object('/products/'+productId).remove();
  }
}
