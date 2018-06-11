import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from './shopping-cart.service';
import { Order } from 'shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: ShoppingCartService) { }

  async placeOrder(order) {
    const result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrder(id) {
    return this.db.object('/orders/' + id)
      .snapshotChanges()
      .pipe(map(res => res.payload.val()));
  }

  getOrderByUserId(id) {
    return this.db.list('/orders/', ref => ref.orderByChild('userId').equalTo(id))
      .snapshotChanges()
      .pipe(map(res => Array.from(res, order => order.payload.val() as Order)));
  }

  getAll() {
    return this.db.list('/orders/')
      .snapshotChanges()
      .pipe(map(res => Array.from(res, order => order.payload.val() as Order)));
  }
}
