import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().snapshotChanges()
    .subscribe(products => {
      const x = products.filter(pr => {
        const y = ({key: pr.key, ...pr.payload.val()});
        console.log('y', y);
        this.products.push(y);
        return y;
      });
      this.filteredProducts = this.products;
    });
    // Keep the subscription for the lifetime of the component here incase the user opened multiple
    // windows to update and add new products, that way it will be synced when there are changes as this is active.
    // Hence we will not use the take operator but implement the onDestroy interface and unsubscribe there.
   }

  ngOnInit() {
  }

  filter(query: string) {
    console.log(this.products);
    this.filteredProducts = (query) ? this.products.filter(p => p.data.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
