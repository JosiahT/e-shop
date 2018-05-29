import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private categoryService: CategoryService, 
    private productService: ProductService
  ) { 
    this.categories$ = categoryService.getAll().snapshotChanges();
  }

  ngOnInit() {
  }

  save(product) {
    this.productService.create(product);
  }
}
