import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrderChartComponent} from './order-chart.component';


const routes: Routes = [{path: '', component: OrderChartComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderChartRoutingModule {
}
