import {Component, OnInit} from '@angular/core';
import {OrderService, LineModel, ChartModel} from '../../shared';

@Component({
  selector: 'app-order-chart',
  templateUrl: './order-chart.component.html',
  styleUrls: ['./order-chart.component.scss']
})
export class OrderChartComponent implements OnInit {
  list: Array<LineModel>;
  chartList: Array<ChartModel>;

  constructor(private orderService: OrderService) {
    this.getList();
  }

  ngOnInit() {
  }

  getList() {
    this.orderService.getSaleAndNums().subscribe(r => {
      this.chartList = r;
      this.list = new Array<LineModel>();
      this.list.push({name: 'Sales', series: []});
      this.list.push({name: 'Nums', series: []});
      this.chartList.map(c => {
        this.list.map((l, index) => {
          this.list[index].series.push({name: c.name, value: index === 0 ? c.sales : c.num});
        });
      });

    });
  }
}
