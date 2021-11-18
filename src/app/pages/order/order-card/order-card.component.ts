import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderService, OrderStatus } from 'src/app/shared';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {

  @Input() public order;
  @Output() completeEvent = new EventEmitter();

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  complete() {
    this.orderService.editOrder({status: OrderStatus.Ready}, this.order.id);
  }

}
