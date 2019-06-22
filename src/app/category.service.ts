import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db : AngularFireDatabase) { }

  getCategories() : Observable<any[]>{
    console.log('get Category Called');
    let list  : AngularFireList<any> = this.db.list('/categories');
    return list.snapshotChanges().map(changes => {
      return changes.map((c) => {
        return { key: c.payload.key, ...c.payload.val() };
      }
      );
    });

  }
}
