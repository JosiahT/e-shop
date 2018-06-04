import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId: string) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem( cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCart() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async updateCart(product, isRemove: boolean) {
    const cartId = await this.getOrCreateCart();
    const items$ = this.getItem(cartId, product.key);
    items$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if (item.key) items$.update({quantity: item.payload.val().quantity + (isRemove ? -1 : 1) });
      else items$.set({product: product.payload.val(), quantity: 1});
    });
  }
}
