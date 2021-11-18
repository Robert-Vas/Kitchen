import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LogChartComponent} from './log-chart.component';


const routes: Routes = [{path: '', component: LogChartComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogChartRoutingModule {
}
