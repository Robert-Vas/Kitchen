import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DataInitializeComponent} from './data-initialize.component';


const routes: Routes = [{path: '', component: DataInitializeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataInitializeRoutingModule {
}
