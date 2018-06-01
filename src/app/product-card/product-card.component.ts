import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('product-action') action: boolean;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product) {
    this.cartService.addToProduct(product);
  }
}
