import {Component, OnInit} from '@angular/core';
import {BarModel, LineModel} from '../../shared/model';
import {LogService} from '../../shared/services/firebase-api';

@Component({
  selector: 'app-log-chart',
  templateUrl: './log-chart.component.html',
  styleUrls: ['./log-chart.component.scss']
})
export class LogChartComponent implements OnInit {
  list: Array<BarModel>;

  constructor(private logService: LogService) {
    this.getList();
  }

  ngOnInit() {
  }

  getList() {
    this.logService.getVisitList().subscribe(r => {
      this.list = r;
    });
  }

}
