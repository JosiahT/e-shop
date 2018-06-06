import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-action') action: boolean;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
   }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    const cartItem = this.shoppingCart.itemsMap[this.product.key];
    if (!cartItem) return 0;
    return cartItem.quantity;
  }
}
