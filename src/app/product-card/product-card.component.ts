import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-action') action: boolean;
  @Input('shopping-cart') shoppingCart: any;

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
    if (!this.shoppingCart.items[this.product.key]) return 0;
    return this.shoppingCart.items[this.product.key].quantity;
  }
}
