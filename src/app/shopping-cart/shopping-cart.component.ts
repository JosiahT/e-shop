import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart$;
  keys: string[];
  cart;
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy() {
    this.cart$.unsubscribe();
  }

  addToCart(product: Product) {
    console.log(product);
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  getTotalQuantity() {
    let totalQuantity = 0;
    for (const productId of this.keys) totalQuantity += this.cart[productId].quantity;
    return totalQuantity;
  }

}
