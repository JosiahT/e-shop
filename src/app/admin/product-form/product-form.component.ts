import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.categories$ = categoryService.getAll().snapshotChanges();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) productService.get(this.id).valueChanges().pipe(take(1)).subscribe(pr => this.product = pr);
    // here no need to implement the onDestroy to unsubscribe from it because we used take()
    // which only takes 1 item from the observable and the observable would automatically complete.
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    if (this.id) this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
