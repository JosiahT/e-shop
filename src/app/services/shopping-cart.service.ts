import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { take, map } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .snapshotChanges().pipe(map((cart: any) => new ShoppingCart(cart.payload.val().items)));
  }

  async addToCart(product: Product) {
    this.updateCart(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateCart(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem( cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateCart(product: Product, changeBy: number) {
    const cartId = await this.getOrCreateCartId();
    const items$ = this.getItem(cartId, product.key);
    items$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      let quantity = 1;
      if (item && item.payload.val()) quantity = (item.payload.val().quantity || 0) + changeBy;
      if (quantity === 0) items$.remove();
      else items$.update({
        title: product.title, imageUrl: product.imageUrl, price: product.price, quantity: quantity
      });
    });
  }
}
