import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(category?) {
    return this.db.list('/products', ref => {
      if (!category) return ref;
      else return ref.orderByChild('category').equalTo(category);
    }).snapshotChanges().pipe(map(products =>
      Array.from(products, product => ({ key: product.key, data: product.payload.val() }) as Product)));
  }

  get(productId) {
    return this.db.object('/products/' + productId)
      .snapshotChanges().pipe(map(product => ({ key: product.key, data: product.payload.val() }) as Product));
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
