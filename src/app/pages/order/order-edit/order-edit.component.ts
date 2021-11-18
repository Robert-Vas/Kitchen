import { Component, Input, OnInit } from "@angular/core";
import {
  Order,
  OrderDetailService,
  OrderedDishDetails,
  OrderModel,
  OrderService,
  OrderStatus,
} from "../../../shared";
import { NzModalRef } from "ng-zorro-antd";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-order-edit",
  templateUrl: "./order-edit.component.html",
  styleUrls: ["./order-edit.component.scss"],
})
export class OrderEditComponent implements OnInit {
  orderForm: FormGroup;
  @Input() order: OrderModel;
  selectStatus: OrderStatus;
  statusList = Object.values(OrderStatus);
  isLoading = false;

  constructor(
    private modal: NzModalRef,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private orderDetailService: OrderDetailService,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      // these aren't things we care about right now, so they aren't in the model
      // todo: add properties we DO care about changing
      //deliveryDate: [new Date()],
      //deliveryPhone: [""],
      //finishDate: [new Date()],
    });
  }

  ngOnInit() {
    if (this.order) {
      this.selectStatus = this.order.status;
    }
  }

  cancel() {
    this.modal.close();
  }

  onOk() {
    this.isLoading = true;
    const model: Order = {
      ...this.order,
      status: this.selectStatus,
      orderedDishes: this.order.orderedDishes
        .map(({ id, ...dish }) => <[string, any]>[id, { ...dish }])
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {} as { [id: string]: OrderedDishDetails }),
    };
    this.orderService.update(model).then(() => {
      this.isLoading = false;
      this.modal.close(true);
    });
  }
}
