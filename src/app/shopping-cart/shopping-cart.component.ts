import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = (await this.cartService.getCart());
  }

  addToCart(product: Product) {
    console.log(product);
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

}
