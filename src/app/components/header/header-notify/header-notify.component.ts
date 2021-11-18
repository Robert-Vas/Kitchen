import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import {
  NoticeModel,
  NoticeService,
  Order,
  OrderService,
  PageDataService,
} from "../../../shared";

@Component({
  selector: "app-header-notify",
  templateUrl: "./header-notify.component.html",
  styleUrls: ["./header-notify.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNotifyComponent implements OnInit {
  visible = false;
  loading = true;
  noticeList: Array<NoticeModel>;
  orderList: Array<Order>;

  constructor(
    private msg: NzMessageService,
    private noticeService: NoticeService,
    private orderService: OrderService,
    private pageService: PageDataService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.pageService
      .getList([this.noticeService.getList(), this.orderService.getList()])
      .then((results) => {
        this.noticeList = results[0];
        this.orderList = results[1];
        this.noticeList = this.noticeList.slice(0, 5);
        this.orderList = this.orderList.slice(0, 5);
        this.loading = false;
      });
  }
}
