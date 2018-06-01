import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

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
        this.products$ = this.productService.getAll(params.get('category')).valueChanges());
  }
}
