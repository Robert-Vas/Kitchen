import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogChartRoutingModule } from './log-chart-routing.module';
import { LogChartComponent } from './log-chart.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@NgModule({
  declarations: [LogChartComponent],
  imports: [
    CommonModule,
    LogChartRoutingModule,
    SharedModule,
    NgxChartsModule
  ]
})
export class LogChartModule { }
