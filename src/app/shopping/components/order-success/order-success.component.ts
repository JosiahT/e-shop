import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  order$;
  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.order$ = this.route.paramMap.pipe(switchMap(params => {
      if(params.get('id')) return this.orderService.getOrder(params.get('id'));
    }));
  }

}
