import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GoodComponent} from './good.component';


const routes: Routes = [{path: '', component: GoodComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodRoutingModule {
}
