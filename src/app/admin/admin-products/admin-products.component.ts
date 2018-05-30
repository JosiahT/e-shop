import { Component, OnDestroy, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['id', 'title', 'price', 'edit'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  products: any[];
  filteredProducts: any[];
  subscription: Subscription;
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().snapshotChanges().pipe(map(p => {
      return p.filter(pp => {
        const x = pp.payload.val();
        return x;
      });
    })).subscribe(s => {
      this.products = [];
      s.filter(ss => this.products.push({id: this.products.length, key: ss.key, ...ss.payload.val()}));
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });


    /*this.subscription = this.productService.getAll().snapshotChanges().pipe(switchMap(p => ({key: p.key, ...p.payload.val()})))
    .subscribe(products => this.filteredProducts = this.products = products);*/
    // Keep the subscription for the lifetime of the component here incase the user opened multiple
    // windows to update and add new products, that way it will be synced when there are changes as this is active.
    // Hence we will not use the take operator but implement the onDestroy interface and unsubscribe there.
   }

   ngAfterViewInit() {
  }

  filter(query: string) {
    query = query.trim();
    query = query.toLowerCase();
    this.dataSource.filter = query;
    /*this.filteredProducts = (query) ?
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) : this.products;*/
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
