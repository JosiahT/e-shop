import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  userSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { }

  async ngOnInit() {
    this.orders$ = this.authService.user$
      .pipe(switchMap(user => this.orderService.getOrderByUserId(user.uid)));    
  }

}
