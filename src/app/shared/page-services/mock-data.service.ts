import {Injectable} from '@angular/core';
import {BarModel, LineModel} from '../model';
import {DatePipe} from '@angular/common';

@Injectable({providedIn: 'root'})
export class MockDataService {
  totalVisits = Math.ceil(Math.random() * 10000);
  totalUsers = Math.ceil(Math.random() * 10000);
  totalSales = Math.ceil(Math.random() * 100000);
  totalOrders = Math.ceil(Math.random() * 10000);
  totalNotices = Math.ceil(Math.random() * 20);
  totalFavorites = Math.ceil(Math.random() * 200);

  barList = new Array<BarModel>();
  lineList = new Array<LineModel>();
  pieList = new Array<BarModel>();
  visitList = new Array<LineModel>();
  deviceList = ['Android', 'Ios', 'Web', 'Mobile', 'IphoneX'];

  constructor(private datePipe: DatePipe) {
    this.initData();
  }

  private initData() {
    for (let i = 14; i > -1; i--) {
      this.barList.push(({name: this.getDate(-i), value: Math.ceil(Math.random() * 10000)}));
    }
    this.deviceList.map(d => {
      this.pieList.push(({name: d, value: Math.ceil(Math.random() * 1000)}));
    });
    this.visitList[0] = new LineModel({name: 'Num', series: []});
    for (let i = 24; i > -1; i--) {
      this.visitList[0].series.push(({name: this.getDate(-i), value: Math.ceil(Math.random() * 1000)}));
    }

    this.lineList[0] = new LineModel({name: 'Num', series: []});
    for (let i = 4; i > -1; i--) {
      this.lineList[0].series.push(({name: this.getDate(-i), value: Math.ceil(Math.random() * 1000)}));
    }

  }

  private getDate(days: number) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return this.datePipe.transform(date, 'MM-dd');
  }
}
