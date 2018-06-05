import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Observable } from '@firebase/util';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products$;
  shoppingCart$;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap
      .subscribe(params =>
        this.products$ = this.productService.getAll(params.get('category'))
        /*.pipe(map(products =>
            Array.from(products, product => ({ key: product.key, ...product.payload.val()}) as Product)
          ))*/);
  }

  async ngOnInit() {
    this.shoppingCart$ = (await this.cartService.getCart());

  }
}
