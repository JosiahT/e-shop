import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products$;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap
      .subscribe(params =>
        this.products$ = this.productService.getAll(params.get('category'))
          .snapshotChanges()/*.pipe(map(products =>
            Array.from(products, product => ({ key: product.key, ...product.payload.val()}) as Product)
          ))*/);
  }
}
