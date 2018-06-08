import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  order$;
  orderId: string;
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.order$ = this.route.paramMap.pipe(switchMap(params => {
      this.orderId = params.get('id');
      return this.orderService.getOrder(this.orderId);
    }));
  }

}
