import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { Order } from 'src/app/shared/model/order.model';
import { DishesService } from 'src/app/shared/services/firebase-api/dishes.service';
import { MealsService } from 'src/app/shared/services/firebase-api/meals.service';
import { OrderDetailService } from 'src/app/shared/services/firebase-api/order-detail.service';
import { OrderModel, OrderService } from 'src/app/shared/services/firebase-api/order.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { OrderEditComponent } from '../order-edit/order-edit.component';
import { OrderViewComponent } from '../order-view/order-view.component';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.scss']
})
export class OrderAdminComponent implements OnInit {
    sortName = "";
    sortValue = "";
    searchValue = "";
    allList: OrderModel[] = [];
    list: OrderModel[];
    isLoading = false;
  
    constructor(
      private orderService: OrderService,
      private detailService: OrderDetailService,
      private modalService: ModalService,
      private mService: NzModalService
    ) {}
  
    ngOnInit() {
      this.bindData();
    }
  
    bindData() {
      this.orderService.getListAgain().subscribe((result) => {
        this.allList = result;
        this.allList = this.allList.sort(
          (a, b) =>
            new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
        );
        this.list = this.allList;
      });
    }
  
    reset(): void {
      this.searchValue = "";
      this.search();
    }
  
    sort(sort: { key: string; value: string }) {
      this.sortName = sort.key;
      this.sortValue = sort.value;
      this.search();
    }
  
    search() {
      this.list = this.allList.filter(
        (d) => d.id.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
      );
    }
  
    onEdit(data: OrderModel): void {
      this.createComponentModal(data);
    }
  
    createComponentModal(data: OrderModel): void {
      const modal = this.mService.create({
        nzTitle: "Edit Order",
        nzContent: OrderEditComponent,
        nzComponentParams: {
          order: data,
        },
        nzWidth: "750px",
      });
      modal.afterClose.subscribe((result) => {
        if (result) {
          this.bindData();
        }
      });
    }
  
    onView(data: any) {
      this.mService.create({
        nzTitle: "Orders Info",
        nzContent: OrderViewComponent,
        nzComponentParams: {
          data,
        },
        nzWidth: "900px",
      });
    }

}
