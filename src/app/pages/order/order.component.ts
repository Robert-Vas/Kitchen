import { Component, OnInit } from "@angular/core";
import {
  Order,
  OrderService,
  OrderDetailService,
  ModalService,
  OrderDetailModel,
  OrderModel,
  OrderStatus,
} from "../../shared";
import { NzModalService } from "ng-zorro-antd";

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
  sortName = "";
  sortValue = "";
  searchValue = "";
  allList: OrderModel[] = [];
  list: OrderModel[];
  todayList: Array<OrderModel> = [];
  isLoading = false;
  todaysMeals = [];
  todaysDishes = new Map();
  dishNames = [];
  dishCount = [];
  showOrders = false;
  dict = {};
  today = "";
  numDishes = 0;

  constructor(
    private orderService: OrderService,
    private detailService: OrderDetailService,
    private modalService: ModalService,
    private mService: NzModalService
  ) {}

  ngOnInit() {
    //Get today's date
    // var date = new Date().getDate();
    // var month = new Date().getMonth() + 1;
    // var year = new Date().getFullYear();
    // var today: string = month + "-" + date + "-" + year;
    

    // var dayStr = date.toString();
    // var monthStr = month.toString();
    // var yearStr = year.toString();
    // if (dayStr.length == 1) {
    //   dayStr = "0" + dayStr;
    // }
    // if (monthStr.length == 1) {
    //   monthStr = "0" + monthStr;
    // }
    // this.today = yearStr + "-" + monthStr + "-" + dayStr;
    var today = new Date();
    today.setHours(0,0,0,0);
    console.log(today);

    //Get all of the meals for today
    this.todaysMeals = [];
    this.orderService.getListAgain().subscribe((data) => {
      this.resetDataStructures();
      this.allList = data;
      data.forEach((o) => {

        o.orderedDishes.forEach((dish) => {
          let date = new Date(dish.readyOn.toString());
          date.setHours(0,0,0,0);
          // dish.readyOn.setHours(0,0,0,0);
          if (date.getTime() === today.getTime()) {
            if (!this.todayList.includes(o)) this.todayList.push(o);
            this.todaysDishes.set(dish.model.name_en, this.getMapValueOrZero(this.todaysDishes, dish.model.name_en) + dish.count);
            this.numDishes = dish.count + this.numDishes;
          }          
        });

      })      
    });
  }

  report() {
    this.showOrders = !this.showOrders;
  }

  private getMapValueOrZero(map, key) {
    return map.get(key) || 0;
  }

  private resetDataStructures() {
    this.todayList = [];
    this.allList = [];
    this.todaysDishes.clear();
    this.numDishes = 0;
  }
}
