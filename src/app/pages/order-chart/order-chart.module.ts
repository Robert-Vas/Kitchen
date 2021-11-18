import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderChartRoutingModule } from './order-chart-routing.module';
import { OrderChartComponent } from './order-chart.component';
import {SharedModule} from '../../shared/shared.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';


@NgModule({
  declarations: [OrderChartComponent],
  imports: [
    CommonModule,
    OrderChartRoutingModule,
    SharedModule,
    NgxChartsModule
  ]
})
export class OrderChartModule { }
