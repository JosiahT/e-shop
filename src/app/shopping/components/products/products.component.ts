import { Component, OnInit } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from '@firebase/util';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;
  shoppingCart$;

  constructor(
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.route.queryParamMap
      .subscribe(params =>
        this.products$ = this.productService.getAll(params.get('category'))
        /*.pipe(map(products =>
            Array.from(products, product => ({ key: product.key, ...product.payload.val()}) as Product)
          ))*/);
    this.shoppingCart$ = await this.cartService.getCart();

  }

}
