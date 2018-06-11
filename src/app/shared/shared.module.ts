import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule } from '@angular/material';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { OrderService } from './services/order.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    MatSelectModule, MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,    
    NgbModule.forRoot(),

  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    MatSelectModule, MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,    
    NgbModule.forRoot().ngModule
  ],
  providers: [    
    AuthService,
    UserService,
    AuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
