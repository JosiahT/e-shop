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
  @Input('product') product;
  @Input('show-action') action: boolean;
  @Input('shopping-cart') shoppingCart;

  quantity$: Observable<number>;

  constructor(private cartService: ShoppingCartService) {
   }

  updateCart(product, isRemove: boolean) { this.quantity$.subscribe(x=>console.log('x',x));
    this.cartService.updateCart(product, isRemove);
  }

  getQuantity() {

  }
}
