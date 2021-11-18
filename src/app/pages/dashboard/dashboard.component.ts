import { Component, OnInit } from "@angular/core";
import {
  FavoriteService,
  LogService,
  NoticeService,
  OrderService,
  UsersService,
} from "../../shared/services/firebase-api";
import { BarModel, ConfigModel, LineModel, Order } from "../../shared/model";
import * as shape from "d3-shape";
import { MockDataService, PageDataService } from "../../shared";
import { StorageMap } from "@ngx-pwa/local-storage";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  loading = false;
  loadingOrder = false;
  loadingCate = false;
  loadingDevice = false;
  loadingUser = false;
  loadingVisit = false;
  showXAxis = true;
  showYAxis = true;
  curve: any = shape.curveBasis;
  barList: Array<BarModel>;
  barHorizontalList: Array<BarModel>;
  lineList: Array<LineModel>;
  pieList: Array<BarModel>;
  pipList: Array<BarModel>;
  visitList: Array<LineModel>;
  totalVisits = 0;
  totalUsers = 0;
  totalSales = 0;
  totalOrders = 0;
  totalNotices = 0;
  totalFavorites = 0;

  constructor(
    private storage: StorageMap,
    private orderService: OrderService,
    private userService: UsersService,
    private logService: LogService,
    private noticeService: NoticeService,
    private favoriteService: FavoriteService,
    private pageService: PageDataService,
    private mockService: MockDataService
  ) {}

  ngOnInit() {
    this.bindData();
    this.bindChart();
  }

  bindChart() {
    if (ConfigModel.isTest) {
      this.barList = this.mockService.barList;
      this.lineList = this.mockService.lineList;
      this.visitList = this.mockService.visitList;
      this.pieList = this.mockService.pieList;
    } else {
      this.loadChart();
    }
    this.loadingCate = true;
    this.orderService.getBarHorizontalList().subscribe((r) => {
      this.loadingCate = false;
      this.barHorizontalList = r;
      this.pipList = this.barHorizontalList.slice(0, 4);
    });
  }

  loadChart() {
    this.loadingOrder = true;
    this.loadingUser = true;
    this.loadingDevice = true;
    this.loadingVisit = true;
    this.orderService.getBarList().subscribe((r) => {
      this.loadingOrder = false;
      this.barList = r;
    });
    this.userService.getLineList().subscribe((r) => {
      this.loadingUser = false;
      this.lineList = r;
    });
    this.logService.getPieList().subscribe((r) => {
      this.loadingDevice = false;
      this.pieList = r;
    });
    this.logService.getVisitList().subscribe((r) => {
      this.loadingVisit = false;
      const temp = new Array<LineModel>();
      const line = new LineModel({ name: "Num", series: r });
      temp.push(line);
      this.visitList = temp;
    });
  }

  bindData() {
    if (ConfigModel.isTest) {
      this.totalVisits = this.mockService.totalVisits;
      this.totalUsers = this.mockService.totalUsers;
      this.totalSales = this.mockService.totalSales;
      this.totalOrders = this.mockService.totalOrders;
      this.totalNotices = this.mockService.totalNotices;
      this.totalFavorites = this.mockService.totalFavorites;
    } else {
      this.loadStatistics();
    }
  }

  loadStatistics() {
    this.loading = true;
    this.storage.has(ConfigModel.visitKey).subscribe((r) => {
      if (r) {
        forkJoin([
          this.storage.get<number>(ConfigModel.visitKey, { type: "number" }),
          this.storage.get<number>(ConfigModel.userKey, { type: "number" }),
          this.storage.get<number>(ConfigModel.orderKey, { type: "number" }),
          this.storage.get<number>(ConfigModel.saleKey, { type: "number" }),
          this.storage.get<number>(ConfigModel.noticeKey, { type: "number" }),
          this.storage.get<number>(ConfigModel.favoriteKey, { type: "number" }),
        ]).subscribe((results) => {
          this.totalVisits = results[0];
          this.totalUsers = results[1];
          this.totalOrders = results[2];
          this.totalSales = results[3];
          this.totalNotices = results[4];
          this.totalFavorites = results[5];
          this.loading = false;
        });
      } else {
        this.pageService
          .getList([
            this.logService.getList(),
            this.userService.getList(),
            this.orderService.getList(),
            this.noticeService.getList(),
            this.favoriteService.getList(),
          ])
          .then((results) => {
            this.loading = false;
            this.totalVisits = results[0].length;
            this.totalUsers = results[1].length;
            this.totalOrders = results[2].length;
            this.totalSales = +(results[2] as Array<Order>)
              .map((o) =>
                o.paymentSummary
                  ? o.paymentSummary.subtotal +
                    o.paymentSummary.tax -
                    o.paymentSummary.discount
                  : (o as any).total
              )
              .reduce((p, c) => p + c, 0)
              .toFixed(2);
            this.totalNotices = results[3].length;
            this.totalFavorites = results[4].length;

            forkJoin([
              this.storage.set(ConfigModel.visitKey, this.totalVisits),
              this.storage.set(ConfigModel.userKey, this.totalUsers),
              this.storage.set(ConfigModel.orderKey, this.totalOrders),
              this.storage.set(ConfigModel.saleKey, this.totalSales),
              this.storage.set(ConfigModel.noticeKey, this.totalNotices),
              this.storage.set(ConfigModel.favoriteKey, this.totalFavorites),
            ]).subscribe();
          });
      }
    });
  }
}
